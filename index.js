'use strict'

const Summoner = require('./src/summoner'),
      MatchList = require('./src/matchlist')

class LeagueOfNode{
    constructor(key){
        this.summoner = new Summoner(key)
        this.matchlist = new MatchList(key)
    }
}

module.exports = LeagueOfNode
