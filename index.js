'use strict'

const Summoner = require('./src/summoner'),
      MatchList = require('./src/matchlist'),
      Match = require('./src/match'),
      Champion = require('./src/champion'),
      StaticData = require('./src/staticdata')

class LeagueOfNode{
    constructor(key){
        this.summoner = new Summoner(key)
        this.matchlist = new MatchList(key)
        this.match = new Match(key)
        this.champion = new Champion(key)
        this.staticData = new StaticData(key)
    }
}

module.exports = LeagueOfNode
