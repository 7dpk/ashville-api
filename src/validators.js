"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// define a joi validator for the Point interface with descriptive error messages
exports.pointValidator = joi_1.default.object({
    x: joi_1.default.number().required().min(-30000000).max(30000000).error(new Error('"x" is required and must be a number between -30000000 and 30000000')),
    z: joi_1.default.number().required().min(-30000000).max(30000000).error(new Error('"z" is required and must be a number between -30000000 and 30000000')),
    image: joi_1.default.string().required().error(new Error('Please select an icon')),
    imageAnchor: joi_1.default.array().items(joi_1.default.number().required()).length(2).required().error(new Error('"imageAnchor" is required and must be an array of two numbers')),
    imageScale: joi_1.default.number().min(0).max(10).error(new Error('"imageScale" must be a number between 0 and 10')),
    text: joi_1.default.string().error(new Error('Please enter the text for marker')),
    textColor: joi_1.default.string().error(new Error('textColor must be a string')),
    offsetX: joi_1.default.number().error(new Error('offsetX must be a number')),
    offsetY: joi_1.default.number().error(new Error('offsetY must be a number')),
    font: joi_1.default.string().error(new Error('font must be a string')),
    password: joi_1.default.string().required().error(new Error('"password" is required'))
}).required();
