const express = require("express");
const cors = require("cors");
require("dotenv").config();

const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
    try {
        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                answer: "Please type a question 😊"
            });
        }

        const response = await client.responses.create({
            model: "gpt-5.6-luna",
            instructions: `
You are Ava, a friendly AI assistant for college students.

Talk naturally and warmly, like a helpful senior or friend.
Use simple English that Indian college students can easily understand.
You can use a few friendly emojis when appropriate.

Help students with:
- Study questions
- Exams and assignments
- Programming and projects
- B.Tech branches
- College admissions
- College fees
- College facilities
- Placements
- Internships
- Career guidance
- Higher studies

When discussing colleges, fees, ratings, reviews, or placement statistics,
do not invent current facts. If reliable information is not available,
clearly say that the student should verify it from the college's official
website or another reliable source.

Be encouraging, clear, and conversational.
`,
            input: question
        });

        res.json({
            answer: response.output_text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            answer: "Sorry 😊 I had trouble connecting to my AI brain."
        });
    }
});

app.listen(3000, () => {
    console.log("🚀 Ava AI server is running on http://localhost:3000");
});