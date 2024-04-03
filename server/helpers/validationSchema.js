import Joi from "joi";

const authSchema = Joi.object({
    ApiKey: Joi.string().trim().min(20),
    author_id: Joi.string().trim().min(6),
    title: Joi.string().trim().min(3).max(21).required(),
    fandom: Joi.string().trim().max(50),
    is_personal: Joi.boolean().required(),
    original_post: Joi.string().allow(''),
    allergens: Joi.string().trim(),
    description: Joi.string().trim(),
    instructions: Joi.object({}).pattern(Joi.string().trim().max(7), Joi.string().trim().min(3).max(501)).required(),
    ingredients: Joi.object({}).pattern(Joi.string().trim().max(13), Joi.string().trim().min(3).max(501)).required(),
    images: Joi.object({}).pattern(Joi.string().trim().max(5), Joi.string().trim()),
    is_published: Joi.boolean()
});

export default authSchema;