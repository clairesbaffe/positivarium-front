# Le Positivarium - front-end

**Le Positivarium** is a French-speaking positive-only news web application designed to highlight uplifting stories, scientific progress, and inspiring initiatives. It was developed as part of a Bachelor’s degree project in Web & Application Development.

This is the front-end application, built with [**Next.js**](https://nextjs.org), [**TypeScript**](https://www.typescriptlang.org/), and [**Tailwind CSS**](https://tailwindcss.com/).

## Features

- Read positive news only, with dynamic filtering by categories
- Private journal to write daily thoughts and gratitudes
- News feed personnalisation based on journal entries
- Role-based system : reader, publisher, admin, banned
- Admin interface for moderation and role management
- Notification system for key user events (role updates, moderation, etc)
- Responsive UI (desktop and mobile optimised)

## Tech Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- React Markdown Editor Lite
- Icons via Lucide React
- Server communication via RESTful API (see [positivarium-back](https://github.com/clairesbaffe/positivarium-api) repository)
- Authentication with cookies (JWT stored securely)

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### Environment setup

Create a `.env` file at the root of the project:

```env
API_URL=http://your-api-url.com
```

### Run the application

```bash
docker-compose up --build
```

This will start the application in development mode using Docker.

Application will be available at http://localhost:3000.

## Testing

Unit tests are written using Jest.

Run tests using command :

```bash
npm test
```

- Coverage reports are automatically generated and accessible in `/coverage` folder.
- Tests cover a core shared component used widely across the app
- Test results are integrated in CI/CD workflow

## CI/CD Pipeline

This front-end is deployed via Vercel, but automatic deployments are disabled.
Instead, a custom CI/CD workflow using GitHub Actions handles the pipeline :

- On every push :
  - Run unit tests via GitHub Actions
  - If tests pass, the app is deployed to Vercel manually via workflow to production if push was on main or preview on any other branch
  - If tests fail, deployment is blocked to ensure app integrity

This ensures high-quality code is deployed and prevens breaking changes in production.

## Live Demo

The application is deployed on Vercel.
🔗 https://positivarium.vercel.app/

## Notes

- The front-end communicates with a custom REST API (see [back-end repo](https://github.com/clairesbaffe/positivarium-api) for details)
- Only minimal unit testing is implemented as a proof of concept
- Some features are still in progress or planned

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

You are free to use, copy, modify, and distribute the code. However, contributions to this repository must follow its guidelines and remain respectful of the original work.