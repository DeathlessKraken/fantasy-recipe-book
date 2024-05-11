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

}).length(4).required();

const loginSchema = Joi.object({
    username: Joi.string().trim().required().messages({
        "string.empty": "Field cannot be empty.",
    }),

    password: Joi.string().trim().required().messages({
        "string.empty": "Field cannot be empty.",
    })
}).length(2).required();

const postSchema = Joi.object({
    title: Joi.string().trim().min(3).max(60).required(),
    category: Joi.string().trim().pattern(/(beverages|appetizers|meals|bread|desserts|other)/i).required()
        .messages({"string.pattern.base": "Category must match 'beverages', 'appetizers', 'meals', 'bread', 'desserts', or 'other'"}),
    post_origin: Joi.string().trim().uri({
        scheme: ["https"],
        domain: { minDomainSegments: 2 }
    }),
    is_personal: Joi.boolean(),
    description: Joi.string().trim().max(300),
    body: Joi.string().trim().max(5000),
    media_url: Joi.string().trim().uri({
        scheme: ["https"],
        domain: { minDomainSegments: 2 }
    }).required(),
    prep_time: Joi.number().integer().min(1).max(999).required(),
    cook_time: Joi.number().integer().min(1).max(999).required(),
    servings: Joi.number().integer().min(1).max(999).required(),
    ingredients: Joi.object().min(1).max(25)
        .pattern(Joi.string().trim().pattern(/^ingredient(?!0)\d{1,2}$/), 
            Joi.string().trim().min(3).max(100))
        .required().messages({
            "object.unknown": "Ingredient keys must be in format 'ingredient[1-99]'",
            "object.max": "Ingredients object must have no more than 25 keys.",
        }),
    instructions: Joi.object().min(1).max(25)
        .pattern(Joi.string().trim().pattern(/^step(?!0)\d{1,2}$/), Joi.string().trim().min(3).max(500))
        .required().messages({
            "object.unknown": "Instruction keys must be in format 'step[1-99]'",
            "object.max": "Instructions object must have no more than 25 keys."
        }),
}).xor('is_personal','post_origin').required().max(12)
.messages({
    "object.missing": "Post must contain is_personal boolean OR post_origin URL.",
    "object.max": "Post object must have no more than 12 keys.",
    "object.xor": "Post cannot contain BOTH is_personal boolean and post_origin URL."
});

export { registerSchema, loginSchema, postSchema };