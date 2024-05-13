import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import './db/db.js';

import { router as authRoutes } from './routes/authRoutes.js';
import { router as postRoutes } from './routes/postRoutes.js';
import errorHandler, { notFound } from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended: true})); //support parsing of application/x-www-form-urlencoded post data
app.use(express.json()); // support parsing of application/json type post data

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.all("*", notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});