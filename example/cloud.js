/* global Parse */
const ParseClass = require('../index')
const { sendWelcomeEmail, validation } = require('./services/User')
const UserSchema = require('./classes/User')
const Analytics = require('./services/Analytics')

new ParseClass(Parse, Parse.User)
	.beforeSave([validation(UserSchema)])
	.afterSave([sendWelcomeEmail, Analytics.afterSave])
	.afterDelete([Analytics.afterDelete])
