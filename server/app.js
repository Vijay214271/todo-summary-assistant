import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';
import { summarizeTodos } from './controller/todoController.js'; // 👈 use named import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);
app.post('/summarize', summarizeTodos);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
