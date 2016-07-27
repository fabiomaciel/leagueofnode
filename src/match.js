'use strict'

var DefaultCli = require('./default')

const API_VERSION = 'v2.2'
const ROOT = 'match'

class Match extends DefaultCli{

	constructor(key){
		super(key, ROOT, API_VERSION)
	}

	byId (id){
		return this.get(`${id}`)
	}

}

module.exports = Match
