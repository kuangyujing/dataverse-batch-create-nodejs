'use strict'

//const fs = require('fs')
//const { parse } = require('csv-parse')
//const csv = require('csvtojson')
const axios = require('axios')
//const short = require('short-uuid')

require('dotenv').config()
const endpoint = process.env.WEBAPI_ENDPOINT
const access_token = process.env.ACCESS_TOKEN

//const uuid = short.generate();

let payload = '--batch_100\nContent-Type: multipart/mixed;boundary=changeset_AA100\n\n'
// INFO: Content-ID must be started from 1
for (let i = 1; i <= 50000; i++) {
    payload += '--changeset_AA100\nContent-Type: application/http\nContent-Transfer-Encoding:binary\n' +
        'Content-ID: ' + i + '\n\n' +
        `POST ${endpoint}accounts HTTP/1.1\nContent-Type: application/json;type=entry\n\n` +
        `{ "name": "batch5" }\n`
}

const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: endpoint + '$batch',
    headers: {
        'Accept': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'If-None-Match': 'null',
        'Content-Type': 'multipart/mixed;boundary=batch_100',
        'Authorization': 'Bearer ' + access_token,
    },
    data: payload
};

axios(config)
    .then((response) => {
        console.log(response.code)
    })
    .catch((error) => {
        console.log(error.code)
    })

