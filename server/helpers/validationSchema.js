import Joi from "joi";

const authSchema = Joi.object({
    ApiKey: Joi.string().trim().min(6),
    user_id: Joi.string().trim().min(6).allow(''),
    title: Joi.string().trim().min(3).max(40).required(),
    fandom: Joi.string().trim().max(50),
    fandom_media_type: Joi.string().trim().max(20),
    is_personal: Joi.boolean().required(),
    prep_time_mins: Joi.number().integer().min(1).required(),
    cook_time_mins: Joi.number().integer().min(1).required(),
    servings: Joi.number().integer().min(1).required(),
    instructions: Joi.string().trim().max(9000).required(),
    ingredients: Joi.object({}).pattern(Joi.string().trim().max(13), Joi.string().trim().min(3).max(501)).required(),
    original_post_ref: Joi.string().trim().min(3).max(1599).uri().allow(''),
    media: Joi.array().items(Joi.object({
        media_type: Joi.string().trim().max(20).required(),
        media_ref: Joi.string().trim().uri().required(),
        media_position: Joi.number().integer().max(7).required()
    }))
}).with('fandom', 'fandom_media_type').required();

//Cannot provide both apikey and userid. 
//API users who provide key will have key listed in their user_profile.
//Maybe use table of apikeys referencing user_profile ids.

export const likeSchema = Joi.object({
    action: Joi.string().trim().min(4).max(24).required(),
    post_id: Joi.string().trim().max(24).required()
}).with('action', 'post_id').required();

export default authSchema;