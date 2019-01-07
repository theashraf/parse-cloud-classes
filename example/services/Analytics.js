const Parse = require('parse/node')

module.exports = {
	afterDelete: async req => {
		const analytic = new Parse.Object('Analytic')
		analytic.set('event', 'deleted')
		analytic.set('object', {
			className: req.object.className,
			id: req.object.id,
		})
		await analytic.save({}, { userMasterKey: true })
	},
	afterSave: async req => {
		const analytic = new Parse.Object('Analytic')
		analytic.set('event', 'created')
		analytic.set('object', {
			className: req.object.className,
			id: req.object.id,
		})
		await analytic.save({}, { userMasterKey: true })
	},
}
