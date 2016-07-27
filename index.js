'use strict'

const Summoner = require('./src/summoner'),
      MatchList = require('./src/matchlist'),
      Match = require('./src/match'),
      Champion = require('./src/champion')

class LeagueOfNode{
    constructor(key){
        this.summoner = new Summoner(key)
        this.matchlist = new MatchList(key)
        this.match = new Match(key)
        this.champion = new Champion(key)
    }
}

module.exports = LeagueOfNode
