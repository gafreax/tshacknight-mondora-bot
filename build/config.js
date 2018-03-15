'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_LOCALE = exports.AZURE_STORAGE_KEY = exports.AZURE_STORAGE_NAME = exports.AZURE_TABLE_NAME = exports.LOG_FILE = exports.TS_ENDPOINT = exports.MICROSOFT_APP_PASSWORD = exports.MICROSOFT_APP_ID = exports.FACEBOOK_PAGE_ACCESS_TOKEN = exports.FACEBOOK_PAGE_ID = exports.PORT = exports.HOSTNAME = exports.LOG_LEVEL = exports.NODE_ENV = undefined;

require('dotenv/config');

var NODE_ENV = exports.NODE_ENV = process.env.NODE_ENV || 'development';
var LOG_LEVEL = exports.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
var HOSTNAME = exports.HOSTNAME = process.env.HOSTNAME || 'localhost';
var PORT = exports.PORT = process.env.PORT || '3978';
var FACEBOOK_PAGE_ID = exports.FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;
var FACEBOOK_PAGE_ACCESS_TOKEN = exports.FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
var MICROSOFT_APP_ID = exports.MICROSOFT_APP_ID = process.env.MICROSOFT_APP_ID;
var MICROSOFT_APP_PASSWORD = exports.MICROSOFT_APP_PASSWORD = process.env.MICROSOFT_APP_PASSWORD;
var TS_ENDPOINT = exports.TS_ENDPOINT = process.env.TS_ENDPOINT;
var LOG_FILE = exports.LOG_FILE = process.env.LOG_FILE || './tshacknight-mondora-biot.log';
var AZURE_TABLE_NAME = exports.AZURE_TABLE_NAME = 'tshacknightbot'; // You define
var AZURE_STORAGE_NAME = exports.AZURE_STORAGE_NAME = 'mysupportstorage'; // Obtain from Azure Portal
var AZURE_STORAGE_KEY = exports.AZURE_STORAGE_KEY = 'akjAnBVNZoNna55T3U1A5QRuX/uXOXykbejEnxU3YTrMg2ZzKY3tJkqcCdAGO/RpkW54+YX3Paml9W36yFe3/g==';
var DEFAULT_LOCALE = exports.DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'it';
//# sourceMappingURL=config.js.map