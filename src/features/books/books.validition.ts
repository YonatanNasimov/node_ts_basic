import Joi, { ObjectSchema } from "joi";

const validBook: ObjectSchema = Joi.object().keys({
    bookName: Joi.string().required().min(2).max(30).messages({
        'string.base': 'Book name must be of type string',
        'string.min': 'Invalid book name: To short',
        'string.max': 'Invalid book name: To long',
        'string.empty': 'Book name is a required field'
    }),
    author: Joi.string().required().min(2).max(30).messages({
        'string.base': 'author must be of type string',
        'string.min': 'Invalid author: To short',
        'string.max': 'Invalid author: To long',
        'string.empty': 'author is a required field'
    }),
    img_url: Joi.string().required().min(2).max(999).messages({
        'string.base': 'img_url must be of type string',
        'string.min': 'Invalid img_url: To short',
        'string.max': 'Invalid img_url: To long',
        'string.empty': 'img_url is a required field'
    }),
    price: Joi.number().required().min(0).max(999).messages({
        'number.base': 'price must be of type number',
        'number.min': 'Invalid price: To short',
        'number.max': 'Invalid price: To long',
        'number.empty': 'price is a required field'
    }),
    published: Joi.date().allow(null,"").messages({
        'date.base': 'published must be of type date',
        'any.required': 'published Number is required'
    }),
})

export { validBook };

