import post_model from '../models/post_model.js';
import mongoose from 'mongoose';
import express from 'express';

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 9;
        const startIndex = (Number(page) - 1) * LIMIT;   //get the starting index of every page
        const total = await post_model.countDocuments({});

        const posts = await post_model.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);


        res.status(200).json({ data: posts, currentPage: Number(page), numberofPage: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await post_model.findById(id);
        // console.log(post);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getPostBySearch = async (req, res) => {
    const { searchquery, tags } = req.query;

    try {
        const title = new RegExp(searchquery, 'i');

        const posts = await post_model.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const new_Post = new post_model({ ...post, creator: req.userID, createdAt: new Date().toISOString() });

    try {
        await new_Post.save();

        res.status(201).json(new_Post);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await post_model.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await post_model.findByIdAndDelete(id);

    res.json({ message: 'Post deleted successfully' });

}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userID) return res.json({ message: "Unauthenicated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await post_model.findById(id);

    const index = post.likes.findIndex((ids) => ids = String(req.userID));

    if (index === -1) {
        post.likes.push(req.userID);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userID));
    }

    const updatePost = await post_model.findByIdAndUpdate(id, post, { new: true });
    console.log(updatePost);

    res.status(200).json(updatePost);
};

export default router;