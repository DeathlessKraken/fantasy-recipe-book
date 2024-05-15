import jwt from "jsonwebtoken";
import isJWT from "validator/lib/isJWT.js";

export default async function protectRoute (req, res, next) {

    try {
        const token = req.header('authorization').split(' ')[1];

        if(!isJWT(token)) {
            throw Error;
        }

        const user = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                throw Error;
            } else {
                return decoded.user;
            }
        });

        req.user = user;
        next();
        
    } catch (error) {
        next(Error("User not signed in.", {cause:401}));
    }
}