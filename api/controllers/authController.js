import bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../utils/validation.js";
import checkUniqueEmail from "../db/checkUniqueEmail.js";
import checkUniqueUsername from "../db/checkUniqueUsername.js"
import saveUser from "../db/saveUser.js";
import generateToken from "../utils/generateToken.js";
import checkProfanity from "../utils/checkProfanity.js";
import getHashedPasswordFromUser from "../db/getHashedPasswordFromUser.js";

export async function register(req, res) {
    //Grab input from request body
    //Perform validation/sanitation on input
    //Return success code with jwt token
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

        //Check for profanity of username
        if(checkProfanity(username)) {
            res.status(400).json({error: "Username includes profanity."});
            return;
        }

        //Test error outputs, make sure no sensitive info leaks to client [x]
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
        const hashedPassword = await bcrypt.hash(result.password, salt)
            .then(hash => hash)
            .catch(error => {throw new Error("Error generating hashed password.", {cause:500})});

        //Save to db
        await saveUser({
            email: result.email,
            username: result.username,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            role: role
        });

        //Generate token with trusted payload
        const token = generateToken({user: result.username});

        //Send response
        res.status(201).json({
            message: "Successfully registered new account.",
            email: result.email,
            username: result.username,
            token: token
        });

    } catch (error) {
        if(error.details) {
            res.status(400).json(error.details[0].message);
        } else {
            res.status(error.cause).json(error.message);
        }
        return;
    }
}

export async function login(req, res) {
    //Check user exists
    //Compare hashed password
    //check credentials
    //return token if successful
    try {
        const { username, password } = req.body;

        const result = await loginSchema.validateAsync({username, password});

        //Throws error if user exists
        const goodUser = await checkUniqueUsername(result.username).finally(() => false).catch((error) => true);
        const hashedPassword = await getHashedPasswordFromUser(result.username);

        //compare input to hashed password
        const goodPass = await bcrypt.compare(result.password, hashedPassword)
            .then(result => result)
            .catch(error => undefined);

        if(!goodUser || !goodPass) {
            throw new Error("Invalid username or password.", { cause: 400 });
        }

        //Generate token
        const token = generateToken({user: result.username});

        //Send response
        res.status(200).json({
            message: "Successfully logged in.",
            username: result.username,
            token: token
        });

    } catch (error) {
        if(error.details) {
            res.status(400).json(error.details[0].message);
        } else {
            res.status(error.cause).json(error.message);
        }
    }
}