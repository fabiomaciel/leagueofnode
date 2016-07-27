'use strict'

const rx = require('rx'), 
	restify = require('restify'),
	qs = require('querystring')

const API_ROOT = '/api/lol'

const client = restify.createJsonClient({
	url: "https://br.api.pvp.net"
})


class DefaultCli {

	constructor(key, root, api_version, locale){
		this._key = key
		this._root = root
		this._api_version = api_version
		this._locale = locale || 'br'
	}

	get(url, query) {
		if(!query) query = {}
		query.api_key = this._key

		var query = qs.stringify(query)
		var uri = `${API_ROOT}/${this._locale}/${this._api_version}/${this._root}/${url}?${query}`

		return rx.Observable.create(observer =>{ 
			client.get(uri, (err,req,res,body) => {
				if(err) observer.onError(err)
				if(!err) observer.onNext(body)
				observer.onCompleted()
			})
		})
		
	}

}

module.exports = DefaultCli
