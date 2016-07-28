'use strict'

const DefaultCli = require('./default')

const API_VERSION = 'v1.4'
const ROOT = 'summoner'

class Summoner extends DefaultCli{

	constructor(key, locale){
		super(key, ROOT, API_VERSION, locale)
	}

	byName (name){
		return this.get(`by-name/${name}`)
	}

	byId (id){  
		return this.get(id)
	}

	nameById (id){  
		return this.get(`${id}/name`)
	}

	runesById (id){  
		return this.get(`${id}/runes`)
	}
}

module.exports = Summoner
