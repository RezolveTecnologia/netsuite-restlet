# NetSuite Restlet authentication module

## Introduction:
This auxiliary module abstracts the authentication mechanism used by NetSuite Restlets.

## Supported authentication methods:
NLAuth (username and password)
Token based authentication is not supported yet (work in progress)

## Supported Restlet method:

GET (get function)
POST (post function)
PUT (put function)

## Installation

Open a terminal session and enter the following command:

``npm install netsuite-restlet --save``

## Usage

```javascript
let NetSuiteRestlet = require('netsuite-restlet');

const config = {
  account: 'account ID',
  username: 'NetSuite user email address',
  password: 'NetSuite password'.
  role: 'NetSuite role internal ID'
};

const url = 'https://restleturlhere'

let ns = new NetSuiteRestlet(config);

// Example using the get function
ns.get(config).then((out) => { console.log(out)})




