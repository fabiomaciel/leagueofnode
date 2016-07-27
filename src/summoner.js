'use strict'

var DefaultCli = require('./default')

const API_VERSION = 'v1.4'
const ROOT = 'summoner'

class Summoner extends DefaultCli{

  constructor(key){
		super(key, ROOT, API_VERSION)
	}

	byName (name){  
			var options = this.getOptions(`by-name/${name}`);
			return this.get(options, (err, creq, cres, obj) => {
							return obj;
					});
	}
}

module.exports = Summoner
