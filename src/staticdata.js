'use strict'

const DefaultCli = require('./default')

const API_VERSION = 'v1.2'
const ROOT = null
const PREFIX = 'static-data'

class StaticData extends DefaultCli{

	constructor(key, locale){
		super(key, ROOT, API_VERSION, locale)
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

	map(){
		return this.get(`map`)
	}

	mastery(){
		return this.get(`mastery`)
	}

	masteryById(id){
		return this.get(`mastery/${id}`)
	}

	realm(){
		return this.get(`realm`)
	}

	rune(){
		return this.get(`rune`)
	}

	runeById(id){
		return this.get(`rune/${id}`)
	}

	summonerSpell(){
		return this.get(`summoner-spell`)
	}

	summonerSpellById(){
		return this.get(`summoner-spell/${id}`)
	}

	versions(){
		return this.get(`versions`)
	}
	

}

module.exports = StaticData