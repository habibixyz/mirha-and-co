import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// Allow responses up to 5 minutes
export const maxDuration = 300;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const session = await getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const result = streamText({
    model: google('gemini-2.5-flash'), // Using 2.5-flash for maximum speed and capability
    system: `You are Mirha, a warm, honest, and experienced skincare consultant for Indian skin at Mirha & Co. (mirhaandco.com).
    You help users navigate real Indian skin challenges with practical, hype-free advice.
    You have tools to look up the user's skin journal, their current routines, and search the product catalog.
    Always use these tools to personalize your advice and provide factual product recommendations from our database.
    If you recommend a product, format it clearly and mention why it fits their specific journal/routine history.`,
    messages,
    tools: {
      searchProducts: {
        description: 'Search the Mirha & Co database for skincare products based on query',
        parameters: z.object({
          query: z.string().describe('The skin concern, category, or brand to search for, e.g., acne, pigmentation, face wash'),
        }),
        execute: async ({ query }: { query: string }) => {
          const products = await prisma.product.findMany({
            where: {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { brand: { contains: query, mode: "insensitive" } },
                { category: { contains: query, mode: "insensitive" } },
                { concerns: { contains: query, mode: "insensitive" } },
                { skinTypes: { contains: query, mode: "insensitive" } }
              ]
            },
            take: 5
          });
          return JSON.parse(JSON.stringify(products));
        },
      } as any,
      getUserJournal: {
        description: 'Get the recent skin journal entries of the current user to understand their skin history and progress.',
        parameters: z.object({}),
        execute: async () => {
          const entries = await prisma.skinJournal.findMany({
            where: { userId: session.userId },
            orderBy: { date: "desc" },
            take: 5
          });
          return JSON.parse(JSON.stringify(entries));
        },
      } as any,
      getUserRoutines: {
        description: 'Get the current skincare routines configured by the user.',
        parameters: z.object({}),
        execute: async () => {
          const routines = await prisma.routine.findMany({
            where: { userId: session.userId },
            orderBy: { createdAt: "asc" }
          });
          return JSON.parse(JSON.stringify(routines));
        },
      } as any
    },
    maxSteps: 5, // Allow the agent to call multiple tools in a single response
  } as any);

  return (result as any).toDataStreamResponse();
}
