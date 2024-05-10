import jwt from "jsonwebtoken";

export default async function getUserFromToken (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            throw new Error("Unable to verify token in Auth header.", {cause:401});
        } else {
            return decoded.user;
        }
    });

    return user;
}