'use server';
/**
 * @fileOverview A Genkit flow for student personalized learning.
 *
 * - studentPersonalizedLearning - A function that generates an interactive quiz, analyzes knowledge gaps,
 *                                 and suggests personalized learning resources based on student history.
 * - StudentPersonalizedLearningInput - The input type for the studentPersonalizedLearning function.
 * - StudentPersonalizedLearningOutput - The return type for the studentPersonalizedLearning function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StudentPersonalizedLearningInputSchema = z.object({
  topic: z
    .string()
    .describe('The academic topic for which the quiz and resources are needed.'),
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('Desired difficulty level for the quiz question.'),
  discussionHistory: z
    .array(z.object({ role: z.enum(['user', 'ai']), content: z.string() }))
    .optional()
    .describe(
      'A history of past discussions with the AI tutor, to help identify knowledge gaps.'
    ),
  quizPerformanceHistory: z
    .array(
      z.object({
        topic: z.string(),
        question: z.string(),
        userAnswer: z.string(),
        correctAnswer: z.string(),
        isCorrect: z.boolean(),
      })
    )
    .optional()
    .describe(
      'A history of past quiz attempts and performance, to inform knowledge gap analysis.'
    ),
});
export type StudentPersonalizedLearningInput = z.infer<
  typeof StudentPersonalizedLearningInputSchema
>;

const StudentPersonalizedLearningOutputSchema = z.object({
  quizQuestion: z.string().describe('The generated quiz question.'),
  options: z
    .array(z.string())
    .min(4)
    .max(4)
    .describe('Four multiple-choice options for the quiz question.'),
  correctAnswer: z.string().describe('The correct answer among the provided options.'),
  knowledgeGapAnalysis: z
    .string()
    .describe(
      'A summary of identified knowledge gaps based on discussion and quiz history.'
    ),
  suggestedResources: z
    .array(z.object({ title: z.string(), url: z.string() }))
    .optional()
    .describe(
      'A list of personalized learning resources to address identified gaps.'
    ),
});
export type StudentPersonalizedLearningOutput = z.infer<
  typeof StudentPersonalizedLearningOutputSchema
>;

export async function studentPersonalizedLearning(
  input: StudentPersonalizedLearningInput
): Promise<StudentPersonalizedLearningOutput> {
  return studentPersonalizedLearningFlow(input);
}

const studentPersonalizedLearningPrompt = ai.definePrompt({
  name: 'studentPersonalizedLearningPrompt',
  input: { schema: StudentPersonalizedLearningInputSchema },
  output: { schema: StudentPersonalizedLearningOutputSchema },
  prompt: `You are an expert Socratic AI tutor for students, dedicated to fostering deep understanding by challenging them.
Your task is to generate an interactive multiple-choice quiz question, analyze the student's past performance and discussion history for knowledge gaps, and suggest personalized learning resources.

---
Student's Request:
Topic: {{{topic}}}
Difficulty: {{{difficulty}}}

---
Previous Discussion History (if available):
{{#if discussionHistory}}
  {{#each discussionHistory}}
    {{role}}: {{{content}}}
  {{/each}}
{{else}}
  No discussion history available.
{{/if}}

---
Previous Quiz Performance History (if available):
{{#if quizPerformanceHistory}}
  {{#each quizPerformanceHistory}}
    Question: {{{question}}}
    User Answer: {{{userAnswer}}}
    Correct Answer: {{{correctAnswer}}}
    Result: {{#if isCorrect}}Correct{{else}}Incorrect{{/if}}
    ---
  {{/each}}
{{else}}
  No quiz performance history available.
{{/if}}

---
Your output MUST be a JSON object matching the following schema.
1.  **Generate ONE multiple-choice question** related to the "{{topic}}" topic at a "{{difficulty}}" difficulty level. Provide exactly four options, and clearly indicate the correct answer.
2.  **Analyze the provided 'Previous Discussion History' and 'Previous Quiz Performance History'** to identify any potential knowledge gaps or areas where the student might need further reinforcement related to the "{{topic}}". If no history is provided, state that.
3.  **Suggest 2-3 personalized learning resources** (e.g., articles, videos, interactive simulations) that directly address the identified knowledge gaps or help deepen understanding of the "{{topic}}". For each resource, provide a 'title' and a 'url'. If no specific gaps are identified, suggest general high-quality resources for the topic.

Ensure your tone remains Socratic and encouraging, even in the generated analysis.`,
});

const studentPersonalizedLearningFlow = ai.defineFlow(
  {
    name: 'studentPersonalizedLearningFlow',
    inputSchema: StudentPersonalizedLearningInputSchema,
    outputSchema: StudentPersonalizedLearningOutputSchema,
  },
  async (input) => {
    const { output } = await studentPersonalizedLearningPrompt(input);
    return output!;
  }
);
