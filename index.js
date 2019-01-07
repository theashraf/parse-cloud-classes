/* eslint-disable no-new */

module.exports = class {
	constructor(Parse, className) {
		if (!Parse) throw new Error('Parse Object is required')
		if (!className) new Error('class name is required')
		this.Parse = Parse
		this.className = className
	}

	afterSave(handlers) {
		if (!Array.isArray(handlers)) new Error('should get an array of handlers')
		this.Parse.Cloud.afterSave(this.className, async req => {
			for (let handler of handlers) {
				await handler(req)
			}
		})
		return this
	}

	beforeSave(handlers) {
		if (!Array.isArray(handlers)) new Error('should get an array of handlers')
		this.Parse.Cloud.beforeSave(this.className, async req => {
			for (let handler of handlers) {
				await handler(req)
			}
			return req.object
		})
		return this
	}

	afterDelete(handlers) {
		if (!Array.isArray(handlers)) new Error('should get an array of handlers')
		this.Parse.Cloud.afterDelete(this.className, async req => {
			for (let handler of handlers) {
				await handler(req)
			}
		})
		return this
	}

	beforeDelete(handlers) {
		if (!Array.isArray(handlers)) new Error('should get an array of handlers')
		this.Parse.Cloud.beforeDelete(this.className, async req => {
			for (let handler of handlers) {
				await handler(req)
			}
			return req.object
		})
		return this
	}
}
