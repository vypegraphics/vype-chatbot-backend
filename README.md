# Vype Chatbot Backend

This is a Vercel-ready serverless function that receives graphic request data from the chatbot and creates a task in Asana.

## Environment Variables
Create a Vercel project and add the following env variable:

- `ASANA_TOKEN`: Your personal Asana token

## Endpoint
POST /api/submit-graphic-request