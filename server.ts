import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Database connection
const sql = neon(process.env.DATABASE_URL!);

// Ensure table exists
async function initDB() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS waiting_list (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        price_willing_to_pay NUMERIC,
        payment_preference TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
        console.log('Database table checked/created.');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

initDB();

app.post('/api/join', async (req, res) => {
    const { name, email, price, paymentPreference } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and Email are required.' });
    }

    try {
        await sql`
      INSERT INTO waiting_list (name, email, price_willing_to_pay, payment_preference)
      VALUES (${name}, ${email}, ${price}, ${paymentPreference})
    `;
        res.status(200).json({ message: 'Success!' });
    } catch (err: any) {
        if (err.code === '23505') { // Unique constraint violation for email
            // We can just return success to not look broken, or tell them they are already on the list.
            // Let's tell them they are already on the list for clarity.
            return res.status(409).json({ message: 'This email is already on the waiting list.' });
        }
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
