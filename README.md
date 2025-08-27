# ui-test-automation-docker

# 🚀 Cypress TypeScript Automation Project

This project contains an end-to-end (E2E) automation test suite built with **Cypress** and **TypeScript**, containerized with Docker.  
It also provides an **HTTP API server** (Express) to trigger Cypress test runs via a simple HTTP request.

---

## 📦 Tech Stack

- [Cypress](https://www.cypress.io/) – end-to-end testing framework
- [TypeScript](https://www.typescriptlang.org/) – strongly typed JavaScript
- [Express](https://expressjs.com/) – lightweight API server to trigger tests
- [Docker](https://www.docker.com/) – containerized build/runtime environment

---

## 🛠 Project Structure

---

```ini
.
├── cypress/                # Cypress tests, fixtures, and support files
├── dist/                   # Compiled TypeScript output (after build)
├── tsconfig
├── cypress.config.ts       # Cypress configuration
├── Dockerfile              # Docker image definition
├── package.json
└── README.md
├── server.ts              # Express server exposing API endpoint to run Cypress
├── tsconfig.json
```

## ⚙️ Setup (Local Development)

1. **Install dependencies**

```sh
npm install
```

2. **Run tests locally**

- Headed mode:

```sh
npx cypress open
```

- Headless mode:

```sh
npx cypress run
```

3. **Start the API server locally**

```sh
npm run build   # compile TypeScript
node dist/server.js
```

Server will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Running in Docker

Make sure the docker deamon is running before using these commands

1. **Build the image**

```sh
docker build -t cypress-api-runner .
```

2. **Run the container**

```sh
docker run -it -p 3000:3000 cypress-api-runner
```

3. **Check logs**

```sh
docker logs -f cypress-api
```

---

## 🌐 API Usage

Once the server is running (locally or inside Docker), you can trigger tests via HTTP:

- **Run automation**

```sh
curl -X POST http://localhost:3000/run-automation
```

- **Example Response**

```json
{
  "status": "finished",
  "totalTests": 10,
  "totalPassed": 10,
  "totalFailed": 0,
  "browserName": "Chrome"
}
```

---

## 🔑 Environment Variables

Some tests (e.g., Google OAuth) require credentials.  
Set these environment variables either in your shell, `.env` file, or as Docker `-e` flags.

| Variable               | Description                                | Example Value                           |
|------------------------|--------------------------------------------|-----------------------------------------|
| `API_URL`             | Base URL of the backend under test         | `https://demo.spikerz.com/api`          |
| `GOOGLE_CLIENT_ID`    | Google OAuth Client ID                     | `1234567890-abc123.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET`| Google OAuth Client Secret                 | `GOCSPX-abc123xyz456`                   |
| `GOOGLE_REFRESH_TOKEN`| Google OAuth Refresh Token                 | `1//0gExampleTokenString`               |

### Example: Run container with environment variables

```sh
docker run -d -p 3000:3000 \
  -e API_URL=https://demo.spikerz.com/api \
  -e GOOGLE_CLIENT_ID=your-client-id \
  -e GOOGLE_CLIENT_SECRET=your-client-secret \
  -e GOOGLE_REFRESH_TOKEN=your-refresh-token \
  cypress-runner
```

Inside Cypress, these are accessible via:

```ts
Cypress.env("API_URL")
Cypress.env("GOOGLE_CLIENT_ID")
Cypress.env("GOOGLE_CLIENT_SECRET")
Cypress.env("GOOGLE_REFRESH_TOKEN")
```

---

## 🧰 Common Issues

- **Connection reset / cannot reach server**  
   Ensure server listens on `0.0.0.0` inside Docker:

```ts
app.listen(PORT, "0.0.0.0");
```

- **Unauthorized / 401 errors**  
   Double-check Google Auth environment variables are set correctly.

---

## 📖 Scripts (package.json)

- `npm run build` – compile TypeScript to JavaScript (`dist/`)
- `npm run start` – run compiled server (`node dist/server.js`)
- `npm run test:open` – open Cypress in interactive mode
- `npm run test` – run Cypress tests headlessly

---

## ✅ Notes

- This setup is CI/CD-friendly and can be integrated into pipelines.
- The Express server enables remote test execution through a REST API.
- Logs and test results can be extended to push into dashboards or test report tools.
