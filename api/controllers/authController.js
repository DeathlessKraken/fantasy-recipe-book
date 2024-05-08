import bcrypt, { genSalt } from "bcrypt";
import { registerSchema } from "../utils/validation.js";
import checkUniqueEmail from "../db/checkUniqueEmail.js";
import checkUniqueUsername from "../db/checkUniqueUsername.js"
import saveUser from "../db/saveUser.js";

export async function register(req, res) {
    //Grab input from request body
    //Perform validation/sanitation on input
    //Return success code with jwt token, signing them in.
    try {
        const { email, username, password, confirmPassword, admin } = req.body;

        //Define user role
        let role = 'user';
        if(admin && admin === process.env.ADMIN_CODE) {
            role = 'admin';
        } else if (admin && admin !== process.env.ADMIN_CODE) {
            res.status(400).json({error: "Incorrect admin key."});
            return;
        }

        if(!email || !username || !password) {
            res.status(400).json({error: "Please fill in all fields."});
            return;
        }

        if(password !== confirmPassword) {
            res.status(400).json({error: "Passwords do not match."});
            return;
        }

        //Test error outputs, make sure no sensitive info leaks to client [ ]
        //Validate inputs
        const result = await registerSchema.validateAsync({
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        });

        //Make sure email and username are not in use
        const { checkEmail, checkUser } = await Promise.all([
            Promise.resolve(checkUniqueEmail(result.email)),
            Promise.resolve(checkUniqueUsername(result.username))
        ]).then(({email, user}) => [email, user]);

        //hash password
        const salt = 11;
        const hashedPassword = await bcrypt.hash(result.password, salt).then(hash => hash);

        //Save to db
        await saveUser({
            email: result.email,
            username: result.username,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            role: role
        });

        //Send response
        res.status(201).json({
            message: "Successfully registered new account.",
            email: result.email,
            username: result.username,
        });

    } catch (error) {
        if(error.details) {
            res.status(400).json({"Error registering user:": error.details[0].message});
        } else {
            res.status(error.cause).json({"Error registering user:": error.message});
        }
        return;
    }
}

export function login(req, res) {
    res.json("login route");
}

export function logout(req, res) {
    res.json("logout route");
}