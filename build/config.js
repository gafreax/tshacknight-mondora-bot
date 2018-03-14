'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_LOCALE = exports.AZURE_STORAGE_KEY = exports.AZURE_STORAGE_NAME = exports.AZURE_TABLE_NAME = exports.LUIS_INTENTS_THRESHOLD = exports.LUIS_RECOGNIZER_URLS = exports.LOG_FILE = exports.TS_ENDPOINT = exports.MICROSOFT_APP_PASSWORD = exports.MICROSOFT_APP_ID = exports.FACEBOOK_PAGE_ACCESS_TOKEN = exports.FACEBOOK_PAGE_ID = exports.PORT = exports.HOSTNAME = exports.LOG_LEVEL = exports.NODE_ENV = undefined;

require('dotenv/config');

var NODE_ENV = exports.NODE_ENV = process.env.NODE_ENV || 'development';
var LOG_LEVEL = exports.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
var HOSTNAME = exports.HOSTNAME = process.env.HOSTNAME || 'localhost';
var PORT = exports.PORT = process.env.PORT || '3978';
var FACEBOOK_PAGE_ID = exports.FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;
var FACEBOOK_PAGE_ACCESS_TOKEN = exports.FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
var MICROSOFT_APP_ID = exports.MICROSOFT_APP_ID = process.env.MICROSOFT_APP_ID || '16298b77-39aa-4541-a77c-31475ef42317';
var MICROSOFT_APP_PASSWORD = exports.MICROSOFT_APP_PASSWORD = process.env.MICROSOFT_APP_PASSWORD || 'Sn4F##E|Eu7+y@O{';
var TS_ENDPOINT = exports.TS_ENDPOINT = process.env.TS_ENDPOINT;
var LOG_FILE = exports.LOG_FILE = process.env.LOG_FILE || './tshacknight-mondora-biot.log';
var LUIS_RECOGNIZER_URLS = exports.LUIS_RECOGNIZER_URLS = process.env.LUIS_RECOGNIZER_URLS || '';
var LUIS_INTENTS_THRESHOLD = exports.LUIS_INTENTS_THRESHOLD = process.env.LUIS_INTENTS_THRESHOLD || '0.7';
var AZURE_TABLE_NAME = exports.AZURE_TABLE_NAME = 'tshacknightbot'; // You define
var AZURE_STORAGE_NAME = exports.AZURE_STORAGE_NAME = 'mysupportstorage'; // Obtain from Azure Portal
var AZURE_STORAGE_KEY = exports.AZURE_STORAGE_KEY = 'akjAnBVNZoNna55T3U1A5QRuX/uXOXykbejEnxU3YTrMg2ZzKY3tJkqcCdAGO/RpkW54+YX3Paml9W36yFe3/g==';
var DEFAULT_LOCALE = exports.DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'it';
//# sourceMappingURL=config.js.map