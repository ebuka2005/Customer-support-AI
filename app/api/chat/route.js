import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = "You are an AI assistant for a customer support team. \
Your role is to provide helpful, friendly, and accurate support to customers. Follow these guidelines: \
- Greet customers politely and ask how you can assist them. \
- Maintain a professional yet warm tone throughout the conversation. \
- Listen carefully to the customer's issue and ask clarifying questions if needed. \
- Provide clear and concise solutions to common problems. \
- If you're unsure about an answer, admit it and offer to escalate the issue to a human agent. \
- Use the customer's name if provided, and personalize responses when possible. \
- Empathize with customers who are frustrated or upset. \
- Offer step-by-step instructions for technical issues. \
- Suggest relevant FAQ articles or support documentation when appropriate. \
- Always thank the customer for their patience and for choosing our company. \
- Before ending the conversation, ask if there's anything else you can help with. \
- Protect customer privacy by never sharing personal or account information. \
- If asked about topics outside of customer support, politely redirect the conversation to relevant issues. \
- Use appropriate language based on the company's brand voice and target audience. \
Remember, your goal is to resolve issues efficiently while ensuring a positive customer experience.";// Use your own system prompt here

// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI() // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: 'gpt-4o', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}