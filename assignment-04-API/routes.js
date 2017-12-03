const bookmethods= require('./methods')
const Joi = require('joi')


const bookSchema =  {
					title: Joi.string().min(10).max(50).required(),
					author: Joi.string().min(10).max(20).required(),
					genre: Joi.string().min(10).max(15).required(),
					publisher:Joi.string().min(10).max(100).required(),
					copies: Joi.number().required()
				}
module.exports =[
	
	{	path:'/books',
		method: 'POST',
		config: {
			validate: {
				payload:bookSchema}},
		handler: bookmethods.addBooks
	},
	{
		path:'/books',
		method: 'GET',
		handler: bookmethods.getdata
	},
	{
		path:'/books/',
		method: 'GET',
		config: {
			validate: {
			payload: {
					id: Joi.number().required()
				}
			}
		},			
		handler: bookmethods.getbookById
  },
  {
		path:'/books/title/',
		method: 'GET',
		config: {
			validate: {
				payload: {
					title: Joi.string().max(50),
				}
			}
		},			
		handler: bookmethods.getbookbytitle
	},
	
{
		path:'/books/author/',
		method: 'GET',
		config: {
			validate: {
			payload: {
					author: Joi.string().max(20)
				}			
			}
		},			
		handler: bookmethods.getbookbyauthor
	},
	
	{
		path:'/books/genre/',
		method: 'GET',
		config: {
			validate: {
					payload: {
					genre: Joi.string().max(15),
				}
			}
		},			
		handler: bookmethods.getbookbyGenre
	},
{
		path:'/books/delete',
		method: 'GET',
		config: {
			validate: {
				payload: {
					id: Joi.number().required()
				}
			}
		},			
		handler: bookmethods.deletebookbyid
	},
	{
		path:'/books/update',
		method: ['PUT','POST'],
		config: {
			validate: {
				payload:bookSchema
				}
		},			
		handler: bookmethods.updatebook
	}
]
