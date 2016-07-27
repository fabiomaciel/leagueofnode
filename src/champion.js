'use strict'

var DefaultCli = require('./default')

const API_VERSION = 'v1.2'
const ROOT = 'champion'

class Champion extends DefaultCli{

	constructor(key){
		super(key, ROOT, API_VERSION)
	}

	getAll(){
		return this.get('');
	}

	byId (id){
		return this.get(`${id}`)
	}

}

module.exports = Champion
