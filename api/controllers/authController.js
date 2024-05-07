export function register(req, res) {
    //Grab input from request body
    //Perform validation/sanitation on input
    //Return success code with jwt token, signing them in.
    try {
        const { email, username, password, confirmPassword, pfp } = req.body;

        // perform v/s on input

        if(password !== confirmPassword) {
            res.status(400).json({error: "Passwords do not match."});
        }

        //check if username/email already exists.

        //hash password

        //save user to db
        
    } catch (error) {
        console.error("Error registering new user. ", error);
        res.status(500).json("Error registering user.");
    }
}

export function login(req, res) {
    res.json("login route");
}

export function logout(req, res) {
    res.json("logout route");
}