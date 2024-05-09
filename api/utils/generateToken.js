import jwt from "jsonwebtoken";

export default function generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    return token;
}