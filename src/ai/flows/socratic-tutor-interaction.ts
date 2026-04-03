'use server';
/**
 * @fileOverview A Genkit flow for an AI Socratic Tutor that challenges students with questions.
 *
 * - socraticTutorInteraction - A function that handles the interaction with the Socratic AI tutor.
 * - SocraticTutorInteractionInput - The input type for the socraticTutorInteraction function.
 * - SocraticTutorInteractionOutput - The return type for the socraticTutorInteraction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SocraticTutorInteractionInputSchema = z.object({
  topic: z
    .string()
    .describe("The academic topic the student is discussing with the AI tutor."),
  chatHistory: z
    .array(
      z.object({
        speaker: z.enum(['student', 'ai']).describe('The speaker of the message.'),
        message: z.string().describe('The content of the message.'),
      })
    )
    .describe("The history of the conversation between the student and the AI tutor."),
  currentStudentMessage: z.string().describe("The student's current message to the AI tutor."),
});
export type SocraticTutorInteractionInput = z.infer<
  typeof SocraticTutorInteractionInputSchema
>;

const SocraticTutorInteractionOutputSchema = z.object({
  aiResponse: z.string().describe("The Socratic AI's challenging question or clarifying statement."),
});
export type SocraticTutorInteractionOutput = z.infer<
  typeof SocraticTutorInteractionOutputSchema
>;

export async function socraticTutorInteraction(
  input: SocraticTutorInteractionInput
): Promise<SocraticTutorInteractionOutput> {
  return socraticTutorInteractionFlow(input);
}

const socraticTutorInteractionPrompt = ai.definePrompt({
  name: 'socraticTutorInteractionPrompt',
  input: {schema: SocraticTutorInteractionInputSchema},
  output: {schema: SocraticTutorInteractionOutputSchema},
  prompt: `You are an AI Socratic Tutor named 'Socratic AI' for students learning about academic topics. Your goal is to deepen the student's understanding by asking challenging questions, prompting them to explain concepts in their own words, and guiding them to discover answers themselves, rather than providing direct answers.

The current topic of discussion is: {{{topic}}}

Here is the current conversation history:
{{#each chatHistory}}
  {{#if (eq speaker "student")}}
    Student: {{{message}}}
  {{else}}
    AI Tutor: {{{message}}}
  {{/if}}
{{/each}}
Student: {{{currentStudentMessage}}}

Based on the student's last message and the conversation history, ask a thoughtful Socratic question or provide a challenging statement that encourages deeper thinking about the topic. Do not give direct answers. Aim to provoke critical thought and self-discovery. Ensure your response is directly related to the student's current input and the overall topic. Your response should be concise and focused on a single point or question to guide the student's next step in understanding. Your response must be in the form of a question or a statement designed to prompt further critical thinking.`,
});

const socraticTutorInteractionFlow = ai.defineFlow(
  {
    name: 'socraticTutorInteractionFlow',
    inputSchema: SocraticTutorInteractionInputSchema,
    outputSchema: SocraticTutorInteractionOutputSchema,
  },
  async (input) => {
    const {output} = await socraticTutorInteractionPrompt(input);
    return output!;
  }
);
