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

		console.log(uri)
		return rx.Observable.create(observer => { 
			client.get(uri, (err,req,res,body) => {
				if(err) observer.onError(err)
				if(!err) observer.onNext(body)
				observer.onCompleted()
			})
		})
		
	}

}

module.exports = DefaultCli
