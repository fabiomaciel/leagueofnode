'use strict'

var DefaultCli = require('./default')

const API_VERSION = 'v2.2'
const ROOT = 'matchlist'

class MatchList extends DefaultCli{

	constructor(key){
		super(key, ROOT, API_VERSION)
	}

	bySummoner (id){
		return this.get(`by-summoner/${id}`)
	}

}

module.exports = MatchList