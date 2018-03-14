import 'dotenv/config';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
export const HOSTNAME = process.env.HOSTNAME || 'localhost';
export const PORT = process.env.PORT || '3978';
export const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;
export const FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
export const MICROSOFT_APP_ID = process.env.MICROSOFT_APP_ID || '16298b77-39aa-4541-a77c-31475ef42317';
export const MICROSOFT_APP_PASSWORD = process.env.MICROSOFT_APP_PASSWORD || 'Sn4F##E|Eu7+y@O{';
export const TS_ENDPOINT = process.env.TS_ENDPOINT;
export const LOG_FILE = process.env.LOG_FILE || './tshacknight-mondora-biot.log';
export const LUIS_RECOGNIZER_URLS = process.env.LUIS_RECOGNIZER_URLS || '';
export const LUIS_INTENTS_THRESHOLD = process.env.LUIS_INTENTS_THRESHOLD || '0.7';
export const AZURE_TABLE_NAME = 'tshacknightbot'; // You define
export const AZURE_STORAGE_NAME = 'mysupportstorage'; // Obtain from Azure Portal
export const AZURE_STORAGE_KEY = 'akjAnBVNZoNna55T3U1A5QRuX/uXOXykbejEnxU3YTrMg2ZzKY3tJkqcCdAGO/RpkW54+YX3Paml9W36yFe3/g==';
export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'it';
