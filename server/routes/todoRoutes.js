import express from 'express';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../controller/todoController.js';

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id', updateTodo);

export default router;
