import Joi from "joi";

const registerSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email({
            minDomainSegments: 2, 
            tlds: {
                allow: ["com", "net"]
            }
        })
        .lowercase()
        .max(200)
        .required()
        .messages({
            "string.email": "Please enter a valid email.",
            "string.empty": "Field cannot be empty."
        }),

    username: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(21)
        .required()
        .messages({
            "string.alphanum": "Username must be alphanumeric (a-z, 0-9)",
            "string.empty": "Field cannot be empty.",
            "string.min": "Username must have at least 3 characters.",
            "string.max": "Username cannot have more than 21 characters.",
        }),

    password: Joi.string()
        .trim()
        .min(8)
        .required()
        .messages({
            "string.empty": "Field cannot be empty.",
            "string.min": "Password must have at least 8 characters.",
        }),

    confirmPassword: Joi.ref('password'),

}).length(4);

const loginSchema = Joi.object({
    username: Joi.string().trim().required().messages({
        "string.empty": "Field cannot be empty.",
    }),

    password: Joi.string().trim().required().messages({
        "string.empty": "Field cannot be empty.",
    })
}).length(2);

const postSchema = Joi.object({
    title: Joi.string().trim().min(3).max(50).required(),
});

export { registerSchema, loginSchema };