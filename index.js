'use strict'

const Summoner = require('./src/summoner'),
      MatchList = require('./src/matchlist'),
      Match = require('./src/match'),
      Champion = require('./src/champion'),
      StaticData = require('./src/staticdata')

class LeagueOfNode{
    constructor(key){
        ['BR', 'EUNE', 'EUW', 'JP', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'RU', 'TR']
            .forEach(e => {
                e = e.toLowerCase()
                this[e] = {}
                this[e].summoner = new Summoner(key, e)
                this[e].matchlist = new MatchList(key, e)
                this[e].match = new Match(key, e)
                this[e].champion = new Champion(key, e)
                this[e].staticData = new StaticData(key, e)
        })
    }
}

module.exports = LeagueOfNode
