# Welcome to your Lovable project
# 🌱 Lovable Compost Finder – Prompt Engineering Project

**Built for the AI Collection x UTMIIST Hackathon**

**Contributors**: Najma Sultani, Hanhee Lee, Luke Blommesteyn, Andrew Chu

---

## Project Info

**Live Project**: [Lovable AI Compost Search](https://lovable.dev/projects/a85ae806-c5b6-4d2e-98b5-7cfbf0b84b51)

This is a prompt-engineering-driven web application designed to enhance compost reuse by enabling users to perform AI-powered natural language searches for compost listings. The project leverages Gemini AI to make eco-friendly resource sharing easier and more intuitive.

## AI-Powered Search Feature

This project includes an intelligent search feature powered by Google's Gemini AI that allows users to search compost listings using natural language queries.

### Features:
- **Natural Language Search**: Search using phrases like "coffee grounds for my vegetable garden" or "organic waste near restaurants"
- **AI-Powered Suggestions**: Get intelligent search suggestions based on your input
- **Relevance Scoring**: Results are ranked by AI-determined relevance with explanations
- **Real-time Search**: Debounced search with instant results as you type

### Setup:

1. **Get a Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key for Gemini
   - Copy the API key

2. **Configure Environment Variables**:
   - Copy `.env.example` to `.env`
   - Add your Gemini API key:
     ```
     ```

3. **Security Note**: 
   - Never commit your actual API key to version control
   - The API key will be visible in the client-side code, so consider implementing a backend proxy for production use
   - For development and demo purposes, the current setup is sufficient

### Usage:
- Navigate to the "Browse Compost Listings" page
- Use the search bar at the top to enter natural language queries
- Click on AI-generated suggestions for quick searches
- View relevance scores and explanations for search results

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a85ae806-c5b6-4d2e-98b5-7cfbf0b84b51) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Google Gemini AI (for intelligent search)
- Supabase (for data storage)
- TanStack Query (for data fetching)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a85ae806-c5b6-4d2e-98b5-7cfbf0b84b51) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
