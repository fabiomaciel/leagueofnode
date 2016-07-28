'use strict'

const DefaultCli = require('./default')

const API_VERSION = 'v2.2'
const ROOT = 'matchlist'

class MatchList extends DefaultCli{

	constructor(key, locale){
		super(key, ROOT, API_VERSION, locale)
	}

	bySummoner (id, query){
		return this.get(`by-summoner/${id}`, query)
	}

}

module.exports = MatchList
