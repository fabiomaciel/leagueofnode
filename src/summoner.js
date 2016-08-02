'use strict'

const async = require('./util/async'),
	wait = require('./util/wait')

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

	lastMatchByName(name){
		return this.byName(name).then(s => {
			return this.lastMatchById(s[name.replace(/ /g, '')].id)
		})
	}

	lastMatchById(id, timeline){
		let self = this
		return new Promise(function(resolve){
			async(function *(){
				yield wait(200)
				let lastmatch = yield self._matchlist.bySummoner(id, {
					beginIndex:0, endIndex: 1
				})
				yield wait(200)
				let match = yield self._match.byId(lastmatch.matches[0].matchId, timeline)

				let lolchampions = yield self._static.champion().toArray()
				let lolrunes = yield self._static.rune().toArray()
				let lolmasteries = yield self._static.mastery().toArray()
				let lolspells = yield self._static.summonerSpell().toArray()

				let participants = match.participants.map(p => {
					p.champion = lolchampions[p.championId]

					p.runes = p.runes.map(rune => {
						rune.rune = lolrunes[rune.runeId]
						return rune
					})

					p.masteries = p.masteries.map(mastery => {
						mastery.mastery = lolmasteries[mastery.masteryId]
						return mastery
					})

					p.spell1 = lolspells[p.spell1Id]
					p.spell2 = lolspells[p.spell2Id]

					return p
				})

				match.participants = participants

				resolve(match)
			})
		})
	}

}



module.exports = Summoner
