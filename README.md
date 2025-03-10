# MCP.ai

A platform for AI model context providers to share, review, and govern their contributions.

## Features

- Server & Application List with User Reviews
- Adoption and Growth Dashboard
- User Contributions with AI Assistance
- Blockchain-based Incentive System

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/mcp-dao.git
   cd mcp-dao
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file and add your Privy App ID.

4. Start the development server
   ```bash
   npm start
   ```

## Authentication with Privy

This application uses Privy for authentication. To set up Privy:

1. Create an account at [Privy Console](https://console.privy.io/)
2. Create a new project
3. Copy the App ID from your project settings
4. Add the App ID to your `.env` file:
   ```
   REACT_APP_PRIVY_APP_ID=your_privy_app_id_here
   ```
5. Restart the application

If you don't have a Privy App ID, the application will run in demo mode with mock authentication.

## Development

### Project Structure

- `/src/components`: React components
  - `/layout`: Layout components (Header, Footer)
  - `/home`: Home page components
  - `/servers`: Server list and detail components
  - `/dashboard`: Dashboard components
  - `/profile`: User profile components
  - `/dao`: DAO and governance components
  - `/submit`: Submission and review components
  - `/auth`: Authentication components
- `/src/providers`: Context providers
- `/src/theme`: Theme configuration
- `/src/utils`: Utility functions

## License

This project is licensed under the MIT License - see the LICENSE file for details.
