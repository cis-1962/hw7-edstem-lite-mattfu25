import express from 'express';
import z from 'zod';

import Question from '../models/question';
import requireAuth from '../middlewares/require-auth';

// create router
const questionsRouter = express.Router();

// define question input shape for validation
const addQuestionSchema = z.object({
    questionText: z.string(),
});

// define answer input shape for validation
const addAnswerSchema = z.object({
    _id: z.any(),
    answer: z.string(),
});

// get questions router
questionsRouter.get('/', async (req, res) => {
    try {
        const questions = await Question.find({});
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({error: 'An error occurred.'});
        return;
    }
});

// allow only authenticated users to add questions or answers
questionsRouter.use(requireAuth);

// add question router
questionsRouter.post('/add', async (req, res) => {
    try {
        // validate input shape
        const result = addQuestionSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({error: 'Invalid input.'});
            return;
        }

        // extract question text and author
        const { questionText } = req.body;
        if (!questionText) {
            res.status(400).json({error: 'Question text is required.'});
            return;
        }
        const author = req.session!.user;

        console.log(questionText, author);

        // create new question in mongodb
        const newQuestion = new Question({
            questionText,
            author,
        });
        await newQuestion.save();

        res.status(201).json({message: 'Question added.'});
    } catch (error) {
        res.status(500).json({error: 'An error occurred.'});
        return;
    }
});


// answer question router
questionsRouter.post('/answer', async (req, res) => {
    try {
        // validate input shape
        const result = addAnswerSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({error: 'Invalid input.'});
            return;
        }

        // extract _id and answer
        const { _id, answer } = req.body;
        if (!_id || !answer) {
            res.status(400).json({error: 'Question _id and answer are required.'});
            return;
        }

        // add answer to question with _id in mongodb
        await Question.updateOne({_id}, {answer});

        res.status(201).json({message: 'Answer added.'});
    } catch (error) {
        res.status(500).json({error: 'An error occurred.'});
        return;
    }
});

export default questionsRouter;

