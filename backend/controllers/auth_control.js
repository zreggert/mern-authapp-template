import User from '../models/user-model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utlis/error.js'
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try{
        await newUser.save()
        res.status(201).json({
            message: "User created successfully"
        })
    } catch (err) {
        next(err);
    }
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Invalid credentials"))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        const { password: hashedPassword, ...userData } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(userData)
        
    } catch (error) {
        next(error)
    }
}