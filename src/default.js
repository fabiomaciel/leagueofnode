'use strict'

const restify = require('restify'),
	qs = require('querystring')

const API_ROOT = '/api/lol'

const client = restify.createJsonClient({
	url: "https://br.api.pvp.net"
})

class DefaultCli {

	constructor(key, root, api_version){
		this.key = key
		this.root = root
		this.api_version = api_version
	}

	get(options, cb) {
		if(!options.query) options.query = {}
		options.query.api_key = this.key;

		var locale = options.locale || 'br'
			var version = options.version || '1'

			var query = qs.stringify(options.query)

			var uri = `${API_ROOT}/${locale}/${version}/${options.url}?${query}`
			console.log(uri);

		var promise = new Promise(function(resolve, reject){
			client.get(uri, (a,b,c,d)=>{ resolve(cb(a,b,c,d)); })
		})

		return promise;

	}

	getOptions(url){
		var self = this;
		return {
			get version(){return self.api_version},
			uri: url,
			get url(){
				return `${self.root}/${this.uri}`
			},
				set url(uri){
					this.uri = uri
				}
		}
	}
}


module.exports = DefaultCli

