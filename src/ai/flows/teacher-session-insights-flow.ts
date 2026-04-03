'use server';
/**
 * @fileOverview This file implements a Genkit flow for teachers to get insights
 * into student readiness, identify knowledge gaps, and suggest optimized session flows.
 *
 * - teacherSessionInsights - A function that generates session insights for a teacher.
 * - TeacherSessionInsightsInput - The input type for the teacherSessionInsights function.
 * - TeacherSessionInsightsOutput - The return type for the teacherSessionInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TeacherSessionInsightsInputSchema = z.object({
  students: z.array(
    z.object({
      name: z.string().describe('The name of the student.'),
      readinessPercentage: z.number().min(0).max(100).describe('The readiness percentage of the student for the upcoming topic.'),
      knowledgeGaps: z.array(z.string()).describe('A list of specific knowledge gaps identified for the student.'),
    })
  ).describe('An array of student data, including their name, readiness, and knowledge gaps.'),
  upcomingTopic: z.string().describe('The topic for the upcoming class session.'),
  classContext: z.string().describe('Context about the class, e.g., Grade level, subject, specific unit.'),
  sessionDurationMinutes: z.number().int().min(1).describe('The total duration of the class session in minutes.'),
});
export type TeacherSessionInsightsInput = z.infer<typeof TeacherSessionInsightsInputSchema>;

const TeacherSessionInsightsOutputSchema = z.object({
  readinessSummary: z.string().describe('A concise summary of the overall class readiness.'),
  atRiskStudents: z.array(z.string()).describe('A list of student names identified as at-risk.'),
  commonKnowledgeGaps: z.array(z.string()).describe('A list of the top 2-3 most common knowledge gaps across the class.'),
  suggestedSessionFlow: z.array(
    z.object({
      timeRange: z.string().describe('The time range for the activity (e.g., "0:00-5:00").'),
      activity: z.string().describe('A description of the activity to be conducted during this time.'),
    })
  ).describe('A minute-by-minute breakdown of the suggested class session flow.'),
});
export type TeacherSessionInsightsOutput = z.infer<typeof TeacherSessionInsightsOutputSchema>;

export async function teacherSessionInsights(input: TeacherSessionInsightsInput): Promise<TeacherSessionInsightsOutput> {
  return teacherSessionInsightsFlow(input);
}

const teacherSessionInsightsPrompt = ai.definePrompt({
  name: 'teacherSessionInsightsPrompt',
  input: { schema: TeacherSessionInsightsInputSchema },
  output: { schema: TeacherSessionInsightsOutputSchema },
  prompt: `You are an educational AI assistant designed to help teachers prepare for their classes.
Your task is to analyze the provided student data for an upcoming session and generate insights for the teacher.

Here is the class context: {{{classContext}}}
The upcoming topic is: {{{upcomingTopic}}}
The session duration is: {{{sessionDurationMinutes}}} minutes

Here is the data for each student:
{{#each students}}
- Name: {{this.name}}
  Readiness: {{this.readinessPercentage}}%
  Knowledge Gaps: {{#each this.knowledgeGaps}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

Please provide the following insights in JSON format, strictly adhering to the schema provided:

1.  **Readiness Summary**: Provide a concise summary of the overall class readiness for the upcoming topic. Mention the average readiness, and highlight any notable trends or observations.
2.  **At-Risk Students**: List the names of any students whose readiness percentage is below 50%, or who have multiple significant knowledge gaps. If no students are at risk, return an empty array.
3.  **Common Knowledge Gaps**: Identify the top 2-3 most prevalent knowledge gaps across the entire class. If there are fewer than 3 distinct gaps, list all identified gaps. Return an empty array if no common gaps are found.
4.  **Suggested Session Flow**: Propose a minute-by-minute class session flow that incorporates student-led activities (e.g., presentations, Q&A), and specifically addresses the identified common knowledge gaps. The total duration of the flow segments should add up to the specified 'sessionDurationMinutes'. Example format: "0:00-5:00", "5:00-20:00". Ensure the activities are relevant to the 'upcomingTopic'.

Output strictly in JSON format.`,
});

const teacherSessionInsightsFlow = ai.defineFlow(
  {
    name: 'teacherSessionInsightsFlow',
    inputSchema: TeacherSessionInsightsInputSchema,
    outputSchema: TeacherSessionInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await teacherSessionInsightsPrompt(input);
    return output!;
  }
);
