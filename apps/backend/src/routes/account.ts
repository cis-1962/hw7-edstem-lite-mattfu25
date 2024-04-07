import express from 'express';
import z from 'zod';
import bcrypt from 'bcrypt';

import User from '../models/user';
import requireAuth from '../middlewares/require-auth';

// create router
const accountRouter = express.Router();

// define input shape for validation
const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
});

// login status route
accountRouter.get('/', async (req, res, next) => {
    try {
        if (!req.session!.user) {
            res.status(200).json({isLoggedIn: false});
            return;
        } 
        res.status(200).json({isLoggedIn: true, username: req.session!.user});
        return;        
    } catch (error) {
        next(error);
        return;
    }
});

// signup route
accountRouter.post('/signup', async (req, res, next) => {
    try {
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
        return
    } catch (error) {
        next(error);
        return;
    }
});

// login route
accountRouter.post('/login', async (req, res, next) => {
    try {
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
    
         // check if username and password is incorrect
         const user = await User.findOne({ username });
         if (!user) {
             res.status(400).json({ error: 'Incorrect username.' });
             return;
         }
         
         const correctPassword = await bcrypt.compare(password, user.password);
         if (!correctPassword) {
             res.status(400).json({ error: 'Incorrect password.' });
             return;
         }
    
        req.session!.user = username;
        res.status(200).json({message: 'Logged in.'});
        return;
    } catch (error) {
        next(error);
        return;
    }
});

// allow logout only for authenticated users
accountRouter.use(requireAuth);

// logout route
accountRouter.post('/logout', (req, res) => {
    req.session = null;
    res.status(200).json({message: 'Logged out.'});
});

export default accountRouter;