# Vision Mart ( Developer Guide )

## Tech Stacks

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white&style=for-the-badge)
![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white&style=for-the-badge)

<br />

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

    GOOGLE_CLIENT_SECRET  =

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

<br />

## Before You Start Working

Always pull the latest changes from the `main` branch before creating a new branch or starting work:

```bash
git checkout main
git pull origin main
```

This ensures `your branch is up-to-date` and helps avoid merge conflicts.

---

## Branching Strategy

Never work directly on the `main` branch. Always create a dedicated branch for new features, bug fixes, or documentation updates.

### Create a New Branch

```bash
git checkout -b front/your-name     # for frontend
git checkout -b back/your-name      # for backed
```

### Switch Branch

```bash
git checkout main                 # switch to main
git checkout front/your-name      # switch to your branch
```

### Delete Branch

```bash
git branch -d front/your-name               # delete local branch
git push origin --delete front/your-name    # delete remote branch
```

### Sync with Main

```bash
git checkout main
git pull origin main
```

### Push Branch

```bash
git add .
git commit -m "feat(auth): implement login functionality"
git push origin feat/your-name
```

<br />

# Commit Message Guidelines

```
<type>(scope): short description
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring (no functional change)
- `test`: Adding or updating tests
- `chore`: Non-code updates (build tasks, dependencies, etc.)

**Examples:**

```bash
git commit -m "feat(navbar): add GitHub link to top-right corner"
git commit -m "fix(button): correct hover state color"
git commit -m "docs: update README with new instructions"
```

<br />

## Official Tech Documentation

- [Pnpm Documentation](https://pnpm.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Next Auth Documentation](https://next-auth.js.org/getting-started/example)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
