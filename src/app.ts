// const express = require('express');
import express from 'express'; // by using and installing @types/express inteligence works for
// express like we were getting in traditional nodeJS application
import bodyParser from 'body-parser';

import todosRoutes from './routes/todos';

const app = express();

app.use(bodyParser.json());

app.use(todosRoutes)

app.listen(3000);