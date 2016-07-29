'use strict'

const rx = require('rx')
const DefaultCli = require('./default'),
	  MatchList = require('./matchlist'),
	  Match = require('./match'),
      StaticData = new require('./staticdata')

const API_VERSION = 'v1.4'
const ROOT = 'summoner'

class Summoner extends DefaultCli{

	constructor(key, locale){
		super(key, ROOT, API_VERSION, locale)
		this._static = new StaticData(key, locale)
		this._matchlist = new MatchList(key, locale)
		this._match = new Match(key, locale)
	}

	byName (name){
		return this.get(`by-name/${name.replace(/ /g, '%20')}`)
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

	lastMatchById(id){
		return this._matchlist.bySummoner(id, {
				beginIndex:0, endIndex: 1
			})
	}

	lastMatchByname(name){
		let lastMatch = this.byName(name).flatMap(e =>
			this.lastMatchById(e[name.replace(/ /g, '')].id)
		)
		
		let match = lastMatch.flatMap(e =>
			this._match.byId(e.matches[0].matchId)
		)

		let lolchampions = this._static.champion().map(obj2arr)
		let lolrunes = this._static.rune().map(obj2arr)
		let lolmasteries = this._static.mastery().map(obj2arr)
		let lolspells = this._static.summonerSpell().map(obj2arr) 

		let participants = match.map(e => e.participants )
		.flatMap(e => e)
		.flatMap(p => lolchampions.map(c => {
			p.champion = c[p.championId]
			return p
		})).flatMap(p =>
			lolrunes.map(r => {
				p.runes = p.runes.map(pr => {
					pr.rune = r[pr.runeId]
					return pr
				})
				return p
			})
		).flatMap(p =>
			lolmasteries.map(m => {
				p.masteries = p.masteries.map(pm => {
					pm.mastery = m[pm.masteryId]
					return pm
				})
				return p
			})
		).flatMap(p => 
			lolspells.map(s => {
				p.spell1 = s[p.spell1Id]
				p.spell2 = s[p.spell2Id]
				return p
			})
		)

		return participants
			.toArray()
			.zip(match, (p, m) => {
				m.participants = p
				return m
			})

	}
}

function obj2arr(obj){
	obj = obj.data
	let arr = []
	for(let o in obj) 
		arr[obj[o].id] = obj[o]
	return arr
}

module.exports = Summoner
