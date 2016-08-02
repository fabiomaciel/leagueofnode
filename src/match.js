'use strict'

const DefaultCli = require('./default')

const API_VERSION = 'v2.2'
const ROOT = 'match'

class Match extends DefaultCli{

	constructor(key, locale){
		super(key, ROOT, API_VERSION, locale)
	}

	byId (id, includeTimeline){
		return this.get(`${id}`, {includeTimeline: includeTimeline})
	}

}

module.exports = Match
