import express from 'express';
import z from 'zod';
import bcrypt from 'bcrypt';

import User from '../models/user';

// create router
const accountRouter = express.Router();

// define input shape for validation
const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
});

// signup route
accountRouter.post('/signup', async (req, res) => {
    // validate input shape
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({error: 'Invalid input.'});
        return;
    }

    // extract username and password
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).json({error: 'Username and password are required.'});
        return;
    }

    // check if username already exists in mongodb
    const userExists = await User.exists({username});
    if (userExists) {
        res.status(400).json({error: 'Username already exists.'});
        return;
    }

    // create new user in mongodb
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username, 
        password: hashedPassword
    });
    await newUser.save();

    // set session
    req.session!.user = username;
    res.status(201).json({message: 'Account created.'});
});

// login route
accountRouter.post('/login', (req, res) => {

});

// logout route
accountRouter.post('/logout', (req, res) => {

});

export default accountRouter;