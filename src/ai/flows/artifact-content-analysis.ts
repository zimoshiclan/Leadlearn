'use server';
/**
 * @fileOverview A Genkit flow for analyzing student-submitted pre-class artifacts.
 *
 * - artifactContentAnalysis - A function that analyzes a student's submitted artifact.
 * - ArtifactContentAnalysisInput - The input type for the artifactContentAnalysis function.
 * - ArtifactContentAnalysisOutput - The return type for the artifactContentAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArtifactContentAnalysisInputSchema = z.object({
  artifactContent: z
    .string()
    .describe(
      "The content of the student's submitted artifact (e.g., summary, discussion questions)."
    ),
  topic: z.string().describe('The subject topic of the artifact.'),
  studentPreviousKnowledge: z
    .string()
    .optional()
    .describe(
      "Optional: The student's previously known strengths and weaknesses on the topic."
    ),
});
export type ArtifactContentAnalysisInput = z.infer<
  typeof ArtifactContentAnalysisInputSchema
>;

const ArtifactContentAnalysisOutputSchema = z.object({
  understandingAnalysis:
    z.string().describe("A detailed analysis of the student's understanding based on the artifact."),
  knowledgeGaps: z
    .array(z.string())
    .describe('A list of identified knowledge gaps in the student’s understanding related to the topic.'),
  readinessScoreImpact: z
    .number()
    .describe(
      "The impact on the student's readiness score (e.g., +10 for good understanding, -5 for significant gaps). This should be a number between -20 and +20."
    ),
  feedback: z
    .string()
    .describe('Constructive feedback and next steps for the student to improve their understanding.'),
});
export type ArtifactContentAnalysisOutput = z.infer<
  typeof ArtifactContentAnalysisOutputSchema
>;

const analyzeArtifactPrompt = ai.definePrompt({
  name: 'analyzeArtifactPrompt',
  input: {schema: ArtifactContentAnalysisInputSchema},
  output: {schema: ArtifactContentAnalysisOutputSchema},
  prompt: `You are an expert educator tasked with analyzing a student's submitted artifact for a specific topic. Your goal is to assess their understanding, identify knowledge gaps, suggest an impact on their readiness score, and provide constructive feedback.

The student submitted an artifact related to the topic: "{{topic}}".

Artifact Content:
{{{artifactContent}}}

{{#if studentPreviousKnowledge}}
The student's previous known strengths and weaknesses on this topic:
{{{studentPreviousKnowledge}}}
{{/if}}

Based on the provided artifact and topic:
1.  **Analyze Understanding**: Provide a detailed analysis of the student's understanding of the topic as demonstrated in their artifact. Highlight both strong points and areas where understanding is unclear or incorrect.
2.  **Identify Knowledge Gaps**: List specific concepts or sub-topics where the student shows a lack of understanding or misunderstanding. Format this as a JSON array of strings.
3.  **Readiness Score Impact**: Assign a numerical impact on the student's readiness score. This should be a whole number between -20 (for very poor preparation) and +20 (for excellent preparation).
4.  **Constructive Feedback**: Offer actionable feedback and clear next steps for the student to address identified gaps and deepen their understanding.

Your output must be a JSON object conforming to the following schema:
{{output.schema}}`,
});

const artifactContentAnalysisFlow = ai.defineFlow(
  {
    name: 'artifactContentAnalysisFlow',
    inputSchema: ArtifactContentAnalysisInputSchema,
    outputSchema: ArtifactContentAnalysisOutputSchema,
  },
  async (input) => {
    const {output} = await analyzeArtifactPrompt(input);
    if (!output) {
      throw new Error('Failed to get output from analyzeArtifactPrompt');
    }
    return output;
  }
);

export async function artifactContentAnalysis(
  input: ArtifactContentAnalysisInput
): Promise<ArtifactContentAnalysisOutput> {
  return artifactContentAnalysisFlow(input);
}
