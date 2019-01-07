const Joi = require('joi')

const UserSchema = Joi.object()
	.keys({
		email: Joi.string()
			.trim()
			.email()
			.required(),
		username: Joi.string()
			.trim()
			.email()
			.required(),
		objectId: Joi.string(),
		createdAt: Joi.date().iso(),
		updatedAt: Joi.date().iso(),
		emailVerified: Joi.boolean().default(false),
	})
	.unknown(true)

module.exports = UserSchema
