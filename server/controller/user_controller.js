import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import User from '../models/user_model.js';

const secret = 'test1';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}


export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists." });

        const hashpassword = await bcrypt.hash(password, 10);

        const result = await User.create({ email, password: hashpassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' });

        res.status(201).json({ result, token });

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Something went wrong! Please try again later." });
    }
}
