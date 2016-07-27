'use strict'

var Summoner = require('./src/summoner')

class LeagueOfNode{
    constructor(key){
        this.summoner = new Summoner(key)
    }
}

module.exports = LeagueOfNode
