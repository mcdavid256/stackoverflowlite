const express = require('express');
const { errors } = require('celebrate');

const app = express();
const questions = require('./routes/questions');
const home = require('./routes/home');

app.use(express.json());
app.use('/', home);
app.use('/api/v1/questions', questions);
app.use(errors());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on ${port} ...`));
