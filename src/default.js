'use strict'

const rx = require('rx'), 
	restify = require('restify'),
	qs = require('querystring')
const regions = require('./regions')	

const API_ROOT = '/api/lol'

const clients = []
regions.forEach(region => {
	clients[region] = restify.createJsonClient({
		url: `https://${region}.api.pvp.net`
	})
})

var currentCli = 0 


class DefaultCli {

	constructor(key, root, api_version, locale){
		this._key = key
		this._root = root
		this._api_version = api_version
		this._locale = locale || 'br'
		this._prefix = ''
	}

	get prefix(){
		if(this._prefix)
			return `${this._prefix}/`
		return ''
	}
	set prefix(value){
		this._prefix = value
	}

	get root(){
		if(this._root)
			return `${this._root}/`
		return ''
	}

	get(url, query) {
		if(!query) query = {}
		query.api_key = this._key

		var query = qs.stringify(query)
		var uri = `${API_ROOT}/${this.prefix}${this._locale}/${this._api_version}/${this.root}${url}?${query}`

		function toCb(cb){
			clients[this._locale].get(uri, cb)
		}

		return getAsPromise(uri, this)
	}

}

function getAsPromise(uri, ctx){
	return new Promise((resolve, reject) => { 
		clients[ctx._locale].get(uri, (err,req,res,body) => {
			if(err) reject(err)
			if(!err) resolve(body)
		})
	})
}


module.exports = DefaultCli
