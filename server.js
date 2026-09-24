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
            model: "gpt-5.4-mini",

            tools: [
                {
                    type: "web_search"
                }
            ],

            instructions: `
You are Ava, a friendly AI assistant for college students.

Your job is to help students with:

- Study questions
- Exams and assignments
- Programming and projects
- B.Tech branches
- College admissions
- College fees
- College facilities
- College ratings and reviews
- Placements
- Internships
- Career guidance
- Higher studies
- B.Tech college information

Talk naturally and warmly, like a helpful senior or friend.

Use simple English that Indian college students can easily understand.

You can use a few friendly emojis when appropriate.

IMPORTANT FOR COLLEGE QUESTIONS:

When a student asks about colleges, especially:
- colleges near a location
- college names
- college ratings
- reviews
- fees
- branches
- admissions
- placements
- placement packages
- facilities

use web search when current information is needed.

Do not invent college information, fees, ratings, reviews, placement statistics,
admission details, or websites.

Prefer official college websites and reliable sources.

If information may have changed, clearly tell the student to verify it
from the college's official website.

When listing colleges, make the answer easy to read using headings
and bullet points.

Be helpful, friendly, clear, and conversational.

Always answer the student's actual question directly.
`,

            input: question
        });

        res.json({
            answer: response.output_text
        });

    } catch (error) {
        console.error("OpenAI API Error:", error);

        res.status(500).json({
            answer: "Sorry 😊 I had trouble connecting to my AI brain."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Ava AI server is running on port ${PORT}`);
});