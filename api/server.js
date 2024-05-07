import express from 'express';
import 'dotenv/config';
import pg from 'pg';
import cors from 'cors';

import { router as userRoutes } from './routes/userRoutes.js';
import { router as postRoutes } from './routes/postRoutes.js';

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended: true})); //support parsing of application/x-www-form-urlencoded post data
app.use(express.json()); // support parsing of application/json type post data

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(port, () => {
    //connect to db
    console.log(`Server running on port ${port}`);
});