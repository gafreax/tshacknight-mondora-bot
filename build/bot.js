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
    bot.connector('*', connector);
    bot.dialog('TestlDialog', function (session) {
        session.endConversation('Ok, Test are OK');
    }).triggerAction({
        matches: /test/
    });
    bot.dialog('VersionDialog', function (session) {
        session.endConversation('Version ');
    }).triggerAction({
        matches: /version/
    });
    bot.dialog('Customers', function (session) {
        session.send('Lista clienti');
        axios({
            method: 'get',
            url: 'https://rest.reviso.com/customers', // TODO put it in conf
            responseType: 'stream',
            headers: {
                "X-AppSecretToken": "SxQv1oTvGSstuYIEKpgBDKbzMccUMVDBEhIeRUriY3M1",
                "X-AgreementGrantToken": "VEvSFx42bWzeBSRP8PQ92xBvXEhbaWO79k9XsGlMelg1",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        }).then(function (response) {
            session.endConversation(response);
        });
    }).triggerAction({
        matches: /clienti/
    });

    console.log('COPMPLETE ');
    return connector.listen();
};

exports.default = startBot;
//# sourceMappingURL=bot.js.map