import { Router } from 'express';

import { Todo } from '../models/todo';

type RequestBody = { text: string }; //user defined types
type RequestParam = { todoId: string }; //user defined types

let todos : Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        todos: todos
    });
})

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody; //type-casting example

    const newToDo : Todo = {
        id: new Date().toISOString(),
        text: body.text
    };

    todos.push(newToDo);
    res.status(201).json({
        message: 'Added Todo item.',
        todo: newToDo,
        todos: todos
    });
})

router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body as RequestBody; // type-casting example
    const params = req.params as RequestParam; // type-casting example

    const tdId = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tdId);
    if(todoIndex >= 0){
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({
            message: "Todo item updated",
            todos: todos
        })
    }
    res.status(404).json({
        message: 'Could not find ToDo item for this id.'
    })
})

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParam; // type-casting example

    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    res.status(200).json({
        message: "Deletion completed",
        todos: todos
    })
})

export default router;