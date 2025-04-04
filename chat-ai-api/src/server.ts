import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { StreamChat } from 'stream-chat';
import OpenAI from 'openai';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize Stream Chat client
const client = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Register user with Stream Chat API
app.post(
  '/register-user',
  async (req: Request, res: Response): Promise<any> => {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    try {
      const userId = email.replace(/[^a-zA-Z0-9_-]/g, '_');

      // Create a new user in Stream Chat
      const userResponse = await client.queryUsers({ id: userId });

      if (!userResponse.users.length) {
        // User does not exist, create a new one
        await client.upsertUser({ id: userId, name, email, role: 'user' });
      }

      res.status(200).json({ userId, name, email });
    } catch (error) {
      res.status(500).json({ Error: 'Internal server error' });
    }
  }
);

// Send message to OpenAI API
app.post('/chat', async (req: Request, res: Response): Promise<any> => {
  const { message, userId } = req.body;
  if (!message || !userId) {
    return res.status(400).json({ error: 'Message and userId are required' });
  }
  try {
    // Vreify user with Stream Chat API
    const userResponse = await client.queryUsers({ id: userId });
    if (!userResponse.users.length) {
      return res
        .status(404)
        .json({ error: 'User not found. Please register first.' });
    }
    const user = userResponse.users[0];
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    const reply = response.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PPORT = process.env.PORT || 5000;

app.listen(PPORT, () => {
  console.log(`Server is running on port ${PPORT}`);
});
