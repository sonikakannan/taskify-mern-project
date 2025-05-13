import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { errorMiddleware } from './middleware/error.js';
import authRouter from './routes/auth.route.js';
import taskRouter from './routes/task.route.js';
import { removeUnverifiedAccounts } from './automation/removeUnverifiedAccounts.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

// Routes
app.use('/api/v1/user', authRouter);
app.use('/api/v1/task', taskRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;

removeUnverifiedAccounts();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
});