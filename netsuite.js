/**
 * NetSuite connection module
 *
 * @author Jaime Ramos
 * @version 0.8.0
 */
'use strict';

let request = require('request');

module.exports = NetSuiteRestlet;

/**
 * NetSuiteRestlet constructor
 *
 * @param config
 * @constructor
 */
function NetSuiteRestlet(config) {
    this.authorization = 'NLAuth nlauth_account=' +
        config.account + ', nlauth_email=' +
        config.username + ', nlauth_signature=' +
        config.password + ', nlauth_role=' +
        config.role;

    this.contentType = 'application/json';

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
            headers: {
                'Authorization': this.authorization,
                'Content-Type': this.contentType
            },
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
            headers: {
                'Authorization': this.authorization,
                'Content-Type': this.contentType
            },
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
            headers: {
                'Authorization': this.authorization,
                'Content-Type': this.contentType
            },
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