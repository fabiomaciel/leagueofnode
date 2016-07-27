'use strict'

var DefaultCli = require('./default')

const API_VERSION = 'v1.2'
const ROOT = null
const PREFIX = 'static-data'

class StaticData extends DefaultCli{

	constructor(key){
		super(key, ROOT, API_VERSION)
		this.prefix = PREFIX 
	}

	champion(){
		return this.get(`champion`)
	}

}

module.exports = StaticData