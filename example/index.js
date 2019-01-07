const path = require('path')
const express = require('express')
const { ParseServer } = require('parse-server')
const app = express()

var api = new ParseServer({
	databaseURI: 'mongodb://localhost:27017/dev',
	cloud: path.resolve(__dirname, 'cloud.js'),
	appId: 'myAppId',
	masterKey: 'myMasterKey',
	serverURL: 'http://localhost:3000/parse',
	logLevel: 5,
})

app.use('/parse', api)

app.listen(3000, function() {
	console.log('parse-cloud-classes example running on port 3000.')
})
