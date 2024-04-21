import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodeData;

        decodeData = jwt.verify(token, 'test1');

        req.userID = decodeData?.id;

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;