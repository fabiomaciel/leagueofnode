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

	championById(id){
		return this.get(`champion/${id}`)
	}

	item(){
		return this.get(`item`)
	}

	itemById(id){
		return this.get(`item/${id}`)
	}

	languageStrings(){
		return this.get(`language-strings`)
	}

	languages(){
		return this.get(`languages`)
	}

}

module.exports = StaticData