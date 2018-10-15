/**
 * NetSuite connection module
 *
 * @author Jaime Ramos
 * @version 0.8.0
 */
'use strict';

let request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');

module.exports = NetSuiteRestlet;

/**
 * NetSuiteRestlet constructor
 *
 * @param config
 * @constructor
 */
function NetSuiteRestlet(config) {
    let mode = config.mode;

    if (!mode || mode === 'nlauth') {
        this.authorization = 'NLAuth nlauth_account=' +
            config.account + ', nlauth_email=' +
            config.username + ', nlauth_signature=' +
            config.password + ', nlauth_role=' +
            config.role;

        this.contentType = 'application/json';
        this.headers = {
            'Authorization': this.authorization,
            'Content-Type': this.contentType
        }
    }
    else {
        if (mode === 'tba') {
            const oauth = OAuth({
                consumer: {
                    key: config.consumerKey,
                    secret: config.consumerSecret
                },
                signature_method: 'HMAC-SHA1',
                realm: config.account,
                hash_function(base_string, key) {
                    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
                }
            });

            const request_data = {
                url: 'https://rest.na2.netsuite.com/app/site/hosting/restlet.nl?script=404&deploy=1&action=getRecordTypes',
                method: 'GET'
            };

            const token = {
                key: 'c27d903a481bfe375c649553a7b480c3a99f2e6e3f48d7460b2ed8921547a9af',
                secret: '608d1210df17644c58d0f71c5819f61a47865d8c45f1c1a3b8d6502cfb63d5f8'
            };

            let headers = oauth.toHeader(oauth.authorize(request_data, token));
            headers['Content-Type'] = 'application/json';

            this.headers = headers;

        }
        else {
            throw 'Invalid authentication mode. You must select tba or nlauth';
        }
    }
}

/**
 * GET Method
 *
 * @param parameters
 * @param url
 * @returns {Promise<any>}
 */
NetSuiteRestlet.prototype.get = function (parameters, url) {

    return new Promise((resolve, reject) => {

        for (let key in parameters) {
            url += '&';
            url += key;
            url += '=';
            url += parameters[key];
        }

        let options = {
            headers: this.headers,
            uri: url,
            method: 'GET',
        };

        request(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                console.log('Body data:', body);
                reject(body || err);
            }
            else {
                if (typeof body == 'string') body = JSON.parse(body);
                resolve(body || err);
            }
        });
    });
};

/**
 * POST Method
 *
 * @param body
 * @param url
 * @returns {Promise<any>}
 */
NetSuiteRestlet.prototype.post = function (body, url) {

    return new Promise((resolve, reject) => {

        let options = {
            headers: this.headers,
            uri: url,
            method: 'POST',
            json: body
        };

        request(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                console.log('Body data:', body);
                reject(body || err);
            }
            else {
                if (typeof body == 'string') body = JSON.parse(body);
                resolve(body || err);
            }
        });
    });
};

/**
 * PUT Method
 *
 * @param body
 * @param url
 * @returns {Promise<any>}
 */
NetSuiteRestlet.prototype.put = function (body, url) {

    return new Promise((resolve, reject) => {

        let options = {
            headers: this.headers,
            uri: url,
            method: 'PUT',
            json: body
        };

        request(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                console.log('Body data:', body);
                reject(body || err);
            }
            else {
                if (typeof body == 'string') body = JSON.parse(body);
                resolve(body || err);
            }
        });
    });
};