'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _botbuilder = require('botbuilder');

var _config = require('./config');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _package = require('../package.json');

var _dotenv = require('dotenv');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var azure = require('botbuilder-azure');


var connector = new _botbuilder.ChatConnector({
    appId: _config.MICROSOFT_APP_ID,
    appPassword: _config.MICROSOFT_APP_PASSWORD
});
var defaultAction = function defaultAction(session, args, next) {
    session.send('Come posso esserti utile?');
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
        session.endConversation('Version ' + _package.version);
    }).triggerAction({
        matches: /version/
    });
    bot.dialog('Customers', function (session) {
        session.send('Lista clienti');
        (0, _axios2.default)({
            method: 'get',
            url: 'https://rest.reviso.com/customers',
            headers: {
                "X-AppSecretToken": "SxQv1oTvGSstuYIEKpgBDKbzMccUMVDBEhIeRUriY3M1",
                "X-AgreementGrantToken": "VEvSFx42bWzeBSRP8PQ92xBvXEhbaWO79k9XsGlMelg1"
            }
        }).then(function (response) {
            response.data.collection.forEach(function (element) {
                return session.send(element.name);
            });
            session.endConversation("---");
        });
    }).triggerAction({
        matches: /clienti/
    });
    bot.dialog('DailyScrum', function (session) {
        var txt = session.message.text;
        var phrase = 'oggi ho lavorato per';
        var company = txt.slice(txt.indexOf(phrase) + phrase.length + 1).toLowerCase();
        (0, _axios2.default)({
            method: 'get',
            url: 'https://rest.reviso.com/customers',
            headers: {
                "X-AppSecretToken": "SxQv1oTvGSstuYIEKpgBDKbzMccUMVDBEhIeRUriY3M1",
                "X-AgreementGrantToken": "VEvSFx42bWzeBSRP8PQ92xBvXEhbaWO79k9XsGlMelg1"
            }
        }).then(function (response) {
            console.log('company ' + company);
            var companies = response.data.collection;
            var companyFound = companies.find(function (element) {
                return element.name.toLowerCase().indexOf(company) >= 0;
            });
            if (companyFound) {
                session.send('Consuntivato il lavoro per ' + companyFound.name);
                session.userData.worked = {};
                session.userData.worked.date = new Date();
                session.userData.worked.company = companyFound;
                console.log(session.userData);
            } else {
                session.send('Nessuna azienda corrispondente, selezionane una fra le seguenti');
                session.send(companies.join('  \n '));
            }
        });
    }).triggerAction({
        matches: /oggi\ ho\ lavorato\ per/
    });
    console.log('COPMPLETE ');
    return connector.listen();
};

exports.default = startBot;
//# sourceMappingURL=bot.js.map