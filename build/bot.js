'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _botbuilder = require('botbuilder');

var _config = require('./config');

var _package = require('../package.json');

var _dotenv = require('dotenv');

var azure = require('botbuilder-azure');


var connector = new _botbuilder.ChatConnector({
    appId: _config.MICROSOFT_APP_ID,
    appPassword: _config.MICROSOFT_APP_PASSWORD
});
var defaultAction = function defaultAction(session, args, next) {
    console.log('default action');
    var rnd = Math.floor(Math.random() * phrase.length + 1);
    session.endDialog(phrase[rnd]);
};
var startBot = function startBot() {
    console.log('Starting bot...');
    var bot = new _botbuilder.UniversalBot(connector, defaultAction);
    var azureTableClient = new azure.AzureTableClient(_config.AZURE_TABLE_NAME, _config.AZURE_STORAGE_NAME, _config.AZURE_STORAGE_KEY);
    var tableStorage = new azure.AzureBotStorage({
        gzipData: false
    }, azureTableClient);
    bot.set('storage', tableStorage);
    bot.set('persistConversationData', false);
    bot.set('persistUserData', true);

    bot.set('localizerSettings', {
        defaultLocale: _config.DEFAULT_LOCALE
    });
    bot.set('IIntentRecognizerSetOptions', {
        intentThreshold: _config.LUIS_INTENTS_THRESHOLD
    });
    bot.recognizer(new _botbuilder.LuisRecognizer(_config.LUIS_RECOGNIZER_URLS));
    bot.connector('*', connector);
    bot.dialog('TestlDialog', function (session) {
        session.endConversation('Ok, I\'m ALIVE!!.');
    }).triggerAction({
        matches: /test/
    });
    console.log('COPMPLETE ');
    return connector.listen();
};

exports.default = startBot;
//# sourceMappingURL=bot.js.map