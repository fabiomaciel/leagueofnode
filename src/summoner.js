'use strict'

var DefaultCli = require('./default')

const API_VERSION = 'v1.4'
const ROOT = 'summoner'

function byParam(param, self){
	var options = self.getOptions(param);
	return self.get(options)
}

class Summoner extends DefaultCli{

	constructor(key){
		super(key, ROOT, API_VERSION)
	}

	byName (name){
		return byParam(`by-name/${name}`, this)
	}

	byId (id){  
		return byParam(id, this)
	}

	nameById (id){  
		return byParam(`${id}/name`, this)
	}

	runesById (id){  
		return byParam(`${id}/runes`, this)
	}
}

module.exports = Summoner
