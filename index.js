const express = require('express');

const app = express();

app.use(express.json());

// Questions
const questions = [
  {
    id: 1,
    Title: 'Question 1',
    Body: 'The body of question 1',
    Tag: 'Javascript',
  },
  {
    id: 2,
    Title: 'Question 2',
    Body: 'The body of question 2',
    Tag: 'Javascript',
  },
  {
    id: 3,
    Title: 'Question 3',
    Body: 'The body of question 3',
    Tag: 'Javascript',
  },
  {
    id: 4,
    Title: 'Question 4',
    Body: 'The body of question 4',
    Tag: 'Javascript',
  },
  {
    id: 5,
    Title: 'Question 5',
    Body: 'The body of question 5',
    Tag: 'Javascript',
  },
];

// Answeres
const answers = [
  {
    id: 1,
    questionId: 1,
    Answer: 'This is the Answer for Question 1',
  },
  {
    id: 2,
    questionId: 2,
    Answer: 'This is the Answer for Question 2',
  },
  {
    id: 3,
    questionId: 3,
    Answer: 'This is the Answer for Question 3',
  },
  {
    id: 4,
    questionId: 3,
    Answer: 'This is another Answer for Question 3',
  },
  {
    id: 5,
    questionId: 3,
    Answer: 'This is yet another Answer for Question 3',
  },
];

// Set Route for Home Page
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Get all Questions
app.get('/api/v1/questions', (req, res) => {
  res.send(questions);
});

// Get a Question
app.get('/api/v1/questions/:id', (req, res) => {
  const question = questions.find((q) => q.id === parseInt(req.params.id, 10));
  if (!question) res.status(404).send('Could not find a question with that ID');
  res.send(question);
});

// Post a Question
app.post('/api/v1/questions', (req, res) => {
  const question = {
    id: questions.length + 1,
    Title: req.body.Title,
    Body: req.body.Body,
    Tag: req.body.Tag,
  };
  questions.push(question);
  res.send(question);
});

// Update A Question
app.put('/api/v1/question/:id', (req, res) => {
  // Look up the course
  const question = questions.find((q) => q.id === parseInt(req.params.id, 10));
  if (!question) res.status(404).send('This question does not exists');

  // Validate
  // If invalid, return 400 - Bad Request

  // Update Question
  question.Title = req.body.Title;
  question.Body = req.body.Body;
  question.Tag = req.body.Tag;
  question.Answer = req.body.Answer;

  // Return the updated Question
  res.send(question);
});

// Add an Answer
app.post('/api/v1/questions/:id/answers', (req, res) => {
  // We find the question. If If it doesnt exist, we return an error with status 400 - Bad Request
  const question = questions.find((q) => q.id === parseInt(req.params.id, 10));
  if (!question) res.status(404).send('Question does not exist');

  // If it exists we add the answer to the Answers array with the question id of the question
  const answer = {
    id: answers.length + 1,
    questionId: req.body.questionId,
    Answer: req.body.Answer,
  };
  answers.push(answer);
  res.send(answer);
});

// Show all answers for a specific Question
app.get('/api/v1/question/:id/answers', (req, res) => {
  const qansweres = answers.filter(
    (a) => a.questionId === parseInt(req.params.id, 10)
  );
  if (!qansweres) res.status(400).send('This question does not have answers');
  res.send(qansweres);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on ${port} ...`));
