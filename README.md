# Dynamic UI Renderer

A production-ready MERN stack application that dynamically renders UI components from JSON schemas. Built with React, TypeScript, Express, and features dual storage modes (local development and GitHub production).

## Features

- Dynamic UI rendering from JSON schemas
- Live preview with real-time validation
- Dual storage: Local filesystem (dev) and GitHub API (prod)
- Type-safe with TypeScript throughout
- Runtime validation with Zod
- Modern UI with Tailwind CSS
- Fully responsive design
- UI management dashboard

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (navigation)
- React Hot Toast (notifications)
- Axios (API client)

### Backend
- Node.js with Express
- TypeScript
- Zod (validation)
- Octokit (GitHub API)
- CORS, body-parser

## Project Structure

```
react-proj/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared TypeScript types
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- (Optional) GitHub Personal Access Token for production storage

### Installation

1. Clone the repository:
```bash
cd "repo name"
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Set up environment variables:
```bash
cd ..
cp .env.example .env
```

Edit `.env` and configure:
- `PORT`: Backend server port (default: 5001)
- `STORAGE_MODE`: Use `local` for development or `github` for production
- `GITHUB_TOKEN`: Required only for GitHub storage mode
- `GITHUB_REPO`: Your GitHub repository (format: `username/repo`)

5. Set up frontend environment variables:

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5001/api/v1
```

### Development

1. Start the backend server (from the `server` directory):
```bash
cd server
npm run dev
```

2. In a new terminal, start the frontend (from the `client` directory):
```bash
cd client
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Usage

### Creating a Dynamic UI

1. Navigate to the home page
2. Enter a unique UI name (alphanumeric and hyphens only)
3. Paste or write your JSON schema in the textarea
4. See a live preview of your UI as you type
5. Click "Submit" to save

### Viewing a Dynamic UI

Access your saved UI at:
```
http://localhost:5173/dynamic-ui/<ui-name>
```

Or visit the UI Manager dashboard to browse all saved UIs.

## JSON Schema Format

The JSON schema supports three element types: `div`, `input`, and `button`.

### Example Schema

```json
[
  {
    "type": "div",
    "header": "User Details",
    "children": [
      {
        "type": "input",
        "name": "firstName",
        "placeholder": "Enter first name"
      },
      {
        "type": "input",
        "name": "lastName",
        "placeholder": "Enter last name"
      },
      {
        "type": "div",
        "header": "Address Details",
        "children": [
          {
            "type": "input",
            "name": "line1",
            "placeholder": "Address Line 1"
          },
          {
            "type": "input",
            "name": "city",
            "placeholder": "City"
          }
        ]
      },
      {
        "type": "button",
        "label": "Submit"
      }
    ]
  }
]
```

### Element Types

#### Div Element
```json
{
  "type": "div",
  "header": "Section Title",
  "children": [ /* nested elements */ ]
}
```

#### Input Element
```json
{
  "type": "input",
  "name": "fieldName",
  "placeholder": "Optional placeholder"
}
```

#### Button Element
```json
{
  "type": "button",
  "label": "Button Text"
}
```

## API Endpoints

### POST /api/ui
Save a new UI schema
- **Body**: `{ uiName: string, schema: UISchema }`
- **Response**: `{ success: boolean, message: string, uiName: string }`

### GET /api/ui/:uiName
Fetch a specific UI schema
- **Response**: `{ uiName: string, schema: UISchema, createdAt?: string }`

### GET /api/ui
List all saved UIs
- **Response**: `{ uis: Array<{ name: string, createdAt?: string }> }`

### DELETE /api/ui/:uiName
Delete a UI schema
- **Response**: `{ success: boolean, message: string }`

## GitHub Storage Mode

To use GitHub for persistent storage:

1. Create a GitHub Personal Access Token with `repo` scope
2. Create or use an existing repository
3. Update `.env`:
```env
STORAGE_MODE=github
GITHUB_TOKEN=your_token_here
GITHUB_REPO=username/repository-name
GITHUB_BRANCH=main
```

Schemas will be saved to the `schemas/` directory in your repository.

## Production Build

1. Build the frontend:
```bash
cd client
npm run build
```

2. The backend will serve the built frontend from `client/dist`

3. Start the production server:
```bash
cd server
npm start
```

## Security Features

- Input validation with Zod
- TypeScript type safety
- CORS configuration
- Environment variable management
- Sanitized user inputs
- Error boundaries

## License

MIT



