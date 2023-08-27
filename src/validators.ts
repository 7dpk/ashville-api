import Joi from "joi";

// define a joi validator for the Point interface with descriptive error messages
export const pointValidator = Joi.object({
    x: Joi.number().required().min(-30000000).max(30000000).error(new Error('"x" is required and must be a number between -30000000 and 30000000')),
    z: Joi.number().required().min(-30000000).max(30000000).error(new Error('"z" is required and must be a number between -30000000 and 30000000')),
    image: Joi.string().required().error(new Error('Please select an icon')),
    imageAnchor: Joi.array().items(Joi.number().required()).length(2).required().error(new Error('"imageAnchor" is required and must be an array of two numbers')),
    imageScale: Joi.number().min(0).max(10).error(new Error('"imageScale" must be a number between 0 and 10')),
    text: Joi.string().error(new Error('Please enter the text for marker')),
    textColor: Joi.string().error(new Error('textColor must be a string')),
    offsetX: Joi.number().error(new Error('offsetX must be a number')),
    offsetY: Joi.number().error(new Error('offsetY must be a number')),
    font: Joi.string().error(new Error('font must be a string')),
    password: Joi.string().required().error(new Error('"password" is required'))
    }).required()
