const { celebrate, Joi } = require('celebrate');
const express = require('express');

const router = express.Router();
const questions = require('../models/questions');
const answers = require('../models/answers');

// Get all Questions
router.get('/', (req, res) => {
  res.send(questions);
});

// Get a Question
router.get('/:id', (req, res) => {
  const question = questions.find((q) => q.id === parseInt(req.params.id, 10));
  if (!question) res.status(404).send('Could not find a question with that ID');
  res.send(question);
});

// Post a Question
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      id: Joi.number(),
      title: Joi.string().min(4).required(),
      description: Joi.string().required(),
      tag: Joi.string().max(15),
    }),
  }),
  (req, res) => {
    const question = {
      id: questions.length + 1,
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
    };
    questions.push(question);
    res.send(question);
  }
);

// Update A Question
router.put(
  '/:id',
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().min(4),
      description: Joi.string(),
      tag: Joi.string().max(15),
    }),
  }),
  (req, res) => {
    const { title, description, tag } = req.body;
    // Look up the course
    const question = questions.find(
      (q) => q.id === parseInt(req.params.id, 10)
    );
    if (!question) res.status(404).send('This question does not exists');

    question.title = title || question.title;
    question.description = description || question.description;
    question.tag = tag || question.tag;

    // Return the updated Question
    res.status(201).json(question);
  }
);

// Add an answer
router.post(
  '/:id/answers',
  celebrate({
    body: Joi.object().keys({
      id: Joi.number(),
      questionId: Joi.number().required(),
      answer: Joi.string().required(),
    }),
  }),
  (req, res) => {
    // We find the question. If If it doesnt exist, we return an error with status 400 - Bad Request
    const question = questions.find(
      (q) => q.id === parseInt(req.params.id, 10)
    );
    if (!question) res.status(401).send('Question does not exist');

    // If it exists we add the answer to the answers array with the question id of the question
    const answer = {
      id: answers.length + 1,
      questionId: req.body.questionId,
      answer: req.body.answer,
    };
    answers.push(answer);
    res.send(answer);
  }
);

// Show all answers for a specific Question
router.get('/:id/answers', (req, res) => {
  const qansweres = answers.filter(
    (a) => a.questionId === parseInt(req.params.id, 10)
  );
  if (!qansweres) res.status(400).send('This question does not have answers');
  res.send(qansweres);
});

module.exports = router;
