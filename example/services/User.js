/* global Parse */
const Joi = require('joi')

module.exports = {
	validation: schema => req => {
		const { error, value } = Joi.validate(req.object.toJSON(), schema)
		if (error) throw error.details[0].message
		value.className = '_User'
		return Parse.Object.fromJSON(value)
	},
	sendWelcomeEmail: async req => {
		const { object: user } = req
		if (!user.existed()) {
			console.log('sending welcome email to ', user.get('username'))
		}
		return req.object
	},
}
