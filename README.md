Email Service Integration API (Assessment)

This project is a Node.js + TypeScript REST API that connects to Mailchimp and GetResponse, allowing users to:

Save and validate API credentials

Verify connection to each ESP (Email Service Provider)

Fetch all lists (Mailchimp) or campaigns (GetResponse)

Tech Stack

Node.js + Express – Backend framework

TypeScript – Type safety

Prisma + PostgreSQL – Database ORM

Axios – For making HTTP requests to ESP APIs

Dotenv – Manage environment variables

Cors – Enable cross-origin requests

Setup Instructions
1. Clone the repo
git clone https://github.com/Inala726/assessment-backend
cd assessment-backend

2. Install dependencies
npm ci

3. Configure environment variables

Create a .env file in the project root:

DATABASE_URL="postgresql://postgres:password@localhost:5432/api-integration-assessment?schema=public"
PORT=3000
MAILCHIMP_API_KEY=your-mailchimp-key
GETRESPONSE_API_KEY=your-getresponse-key


REPLACE CREDENTIALS WITH YOUR OWN DATABSE CONNECTION URL DETAILS AND YOUR ESP API KEYS.

4. Setup Prisma
npx prisma migrate dev --name init
npx prisma generate

5. Run the server
npm run dev


Server runs at:
 http://localhost:3000

📡 API Endpoints
Mailchimp
Save + Validate API Key
POST /api/integrations/mailchimp
Content-Type: application/json

{
  "apiKey": "your-mailchimp-api-key"
}

Fetch Lists (Audiences)
GET /api/integrations/mailchimp/lists?apiKey=your-mailchimp-api-key

GetResponse
Save + Validate API Key
POST /api/integrations/getresponse
Content-Type: application/json

{
  "apiKey": "your-getresponse-api-key"
}

Fetch Campaigns (Lists)
GET /api/integrations/getresponse/lists?apiKey=your-getresponse-api-key

Testing

You can test using:

Postman

cURL

VSCode Thunder Client

Example with curl:

curl -X POST http://localhost:3000/api/integrations/mailchimp \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your-mailchimp-api-key"}'

Database Schema
model Integration {
  id          Int      @id @default(autoincrement())
  service     String
  apiKey      String
  validated   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

Demo

Video explanation: [loom link if required]

Author

Jacob Inala Prince