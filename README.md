# Customer-support-AI

Customer-support-AI is an AI-powered chatbot designed to assist customers by providing instant support and answering their queries. The chatbot is built using Next.js and integrates with OpenAI's API to deliver intelligent responses.

## Features

- **AI-Powered Chat**: Utilizes OpenAI's GPT model to generate responses based on customer queries.
- **Real-Time Interaction**: Provides instant support through a responsive and interactive chat interface.
- **Customizable Responses**: Tailor the chatbot's behavior to meet specific customer service needs.
- **Deployable on Vercel**: Easily deployable to Vercel for fast and scalable hosting.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/ebuka2005/Customer-support-AI.git
    cd Customer-support-AI
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add your environment variables:

    ```bash
    OPENAI_API_KEY=your_openai_api_key_here
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Deployment

The project is configured to be deployed on [Vercel](https://vercel.com/). To deploy:

1. Push your code to GitHub.
2. Connect your GitHub repository to Vercel.
3. Ensure that your environment variables (e.g., `OPENAI_API_KEY`) are set in the Vercel dashboard.
4. Trigger a deployment from the Vercel dashboard.

## Usage

Once deployed, users can interact with the chatbot by visiting the hosted URL. The chatbot will respond to customer inquiries using the power of OpenAI's language models.

## Folder Structure

- `/app`: Contains the main application pages and components.
- `/api`: Holds the API route for handling chat requests.
- `/public`: Public assets like icons and images.
- `/node_modules`: Project dependencies.
- `.env.local`: Environment variables for local development.
- `next.config.mjs`: Configuration file for Next.js.
- `package.json`: Project dependencies and scripts.
- `README.md`: This file.

## Troubleshooting

- **Environment Variables**: Make sure all required environment variables (like `OPENAI_API_KEY`) are correctly set both locally and in the Vercel deployment.
- **API Errors**: If you encounter issues with the OpenAI API, verify your API key and network requests.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository, create a new branch, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

