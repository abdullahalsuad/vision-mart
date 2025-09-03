# Vision Mart

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white&style=for-the-badge)
![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white&style=for-the-badge)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/abdullahalsuad/vision-mart.git
    cd vision-mart
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Configure environment variables:**

    - Create a `.env` file in the root directory.
    - Copy and paste into your `.env`:

    ```bash
    MONGODB_CONNECTION_STRING =

    GOOGLE_CLIENT_ID =

    GOOGLE_CLIENT_SECRET =

    AUTH_SECRET = abd6451176c8b9a18918bee9dd0eb733
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

5.  **Open your browser:**
    - Visit [http://localhost:3000](http://localhost:3000)

<br />

## Project Structure

```bash
app/                          # Next.js app directory
components/                   # React components
db/                           # Database queries
models/                       # Mongoose models
services/                     # MongoDB connection logic
public/                       # Static assets
```

## API Health Check

**Endpoint:** `/api/health`

**Response:**

```json
{
  "status": "VisionMart Server is healthy and fully operational"
}
```
