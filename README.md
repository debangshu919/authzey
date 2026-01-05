<p align="center">
  <a href="https://github.com/debangshu919/authzey" target="_blank"><img src="https://raw.githubusercontent.com/debangshu919/authzey/refs/heads/main/docs/assets/authzey-logo.svg" alt="Authzey Logo" width="500px"/></a>
</p>

<div align="center">
<h2>Simplify your authentication workflow</h2>

<img alt="Code Quality Check" src="https://img.shields.io/github/actions/workflow/status/debangshu919/authzey/code-quality.yml?branch=main&style=for-the-badge&logo=biome&label=lint">
<img alt="License" src="https://img.shields.io/github/license/debangshu919/authzey?style=for-the-badge">

</div>

---

## Introduction

**Authzey** is a CLI tool that helps you set up authentication in your **Next.js** apps in minutes, not hours. Stop fighting configuration files and boilerplate—let Authzey scaffold secure authentication so you can focus on building your product.

### Features

- 🚀 **Zero-config setup** — Interactive prompts guide you through the entire process
- 🔐 **Multiple auth providers** — Currently supports [Better Auth](https://better-auth.com), with more coming soon
- 🗄️ **Database integration** — PostgreSQL with Drizzle ORM support
- 🔑 **OAuth providers** — GitHub, Google, and Discord out of the box
- ⚡ **Framework detection** — Automatically detects your Next.js project configuration

---

## Installation

```bash
# Using npx (recommended)
npx authzey

# Or install globally
npm install -g authzey
authzey
```

### Requirements

- Node.js `>=18`
- A Next.js project (App Router or Pages Router)

---

## Quick Start

1. Navigate to your Next.js project directory:

   ```bash
   cd your-nextjs-app
   ```

2. Run Authzey:

   ```bash
   npx authzey
   ```

3. Follow the interactive prompts to:
   - Choose an authentication framework
   - Select a database (PostgreSQL or SQLite)
   - Pick an ORM (Drizzle)
   - Configure OAuth providers (GitHub, Google, Discord)

4. Authzey will scaffold the necessary files and install dependencies for you.

---

## Supported Technologies

### Authentication Frameworks

| Framework                                      | Status      |
| ---------------------------------------------- | ----------- |
| [Better Auth](https://www.better-auth.com/)    | ✅ Available |
| [Auth.js](https://authjs.dev/)                 | 🔜 Coming   |

### Databases

| Database   | Status      |
| ---------- | ----------- |
| PostgreSQL | ✅ Available |
| SQLite     | 🔜 Coming   |
| MySQL      | 🔜 Coming   |

### ORMs

| ORM                                   | Status      |
| ------------------------------------- | ----------- |
| [Drizzle](https://orm.drizzle.team/)  | ✅ Available |
| [Prisma](https://www.prisma.io/)      | 🔜 Coming   |

### OAuth Providers

| Provider  | Status      |
| --------- | ----------- |
| GitHub    | ✅ Available |
| Google    | ✅ Available |
| Discord   | ✅ Available |
| Microsoft | 🔜 Coming    |
| Apple     | 🔜 Coming    |

---

## Issues

Please make sure to read the [Issue Reporting Checklist](https://github.com/debangshu919/authzey/blob/main/CONTRIBUTING.md#submit-issue) before opening an issue.

## Contributing

We are actively looking for contributors, no matter your skill level or experience. To contribute, check out [CONTRIBUTING.md](https://github.com/debangshu919/authzey/blob/main/CONTRIBUTING.md).

### Contributors

<a href="https://github.com/debangshu919/authzey/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=debangshu919/authzey" />
</a>

---

## License

Authzey is licensed under the [MIT License](LICENSE).
