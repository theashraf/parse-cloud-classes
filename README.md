# Parse Cloud Classes

[![npm](https://img.shields.io/npm/v/parse-cloud-classes.svg)](https://www.npmjs.com/package/parse-cloud-classes)
[![license](https://img.shields.io/github/license/theashraf/parse-cloud-classes.svg)](https://github.com/theashraf/parse-cloud-classes/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dw/parse-cloud-classes.svg)](https://www.npmjs.com/package/parse-cloud-classes)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](#badge)

> Easily extend parse cloud triggers behaviour

An easy way to extend parse cloud triggers behaviour

## Installation

```sh
npm install --save parse-cloud-classes
```

## Example

A working example can be found [here](example)

### Supported versions

- parse-server >= 3.0.0
- node >= 6.4

### Basic Usage

```js
//parse cloud code file
const ParseClass = require('parse-cloud-classes')
const Joi = require('joi')

//validation service
const validation = async req => {
	const { object } = req
	const { error } = Joi.validate(object.toJSON(), validationSchema)
	if (error) throw error.details[0].message
	return req.object
}
//sendWelcomeMail service
const sendWelcomeMail = async req => {
	const { object } = req
	if (!object.existed()) {
		//send welcome email here
	}
}
//analytics service
analytics = {
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

new ParseClass(Parse.User)
	.beforeSave([validation])
	.afterSave([analytics.afterSave, sendWelcomeMail])
	.afterDelete([analytics.afterDelete])
	.beforeDelete([
		async req => {
			if (!req.master) throw 'unauthorized'
			return req.object
		},
	])
```

## Development setup

```sh
npm install && npm run dev
```

## Contribution

1. Fork the project
2. Create your feature branch (`git checkout -b feature/fooBar`), or hotfix branch (`git checkout -b hotfix/fooBar`)
3. Commit your changes (`npm run cz`)
4. Push to the feature branch (`git push origin feature/fooBar`), or hotfix branch (`git push origin hotfix/fooBar`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License, See [LICENSE](LICENSE) for more information
