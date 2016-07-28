'use strict'

const DefaultCli = require('./default')

const API_VERSION = 'v1.2'
const ROOT = 'champion'

class Champion extends DefaultCli{

	constructor(key, locale){
		super(key, ROOT, API_VERSION, locale)
	}

	getAll(){
		return this.get('');
	}

	byId (id){
		return this.get(`${id}`)
	}

}

module.exports = Champion
