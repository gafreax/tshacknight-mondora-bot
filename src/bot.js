import {
    UniversalBot,
    MemoryBotStorage,
    LuisRecognizer,
    IntentDialog,
    ChatConnector,
    AzureTableClient,
    Session,
    RegExpRecognizer
} from 'botbuilder';
import {
    LUIS_RECOGNIZER_URLS,
    LUIS_INTENTS_THRESHOLD,
    MICROSOFT_APP_ID,
    MICROSOFT_APP_PASSWORD,
    AZURE_STORAGE_KEY,
    AZURE_TABLE_NAME,
    AZURE_STORAGE_NAME,
    DEFAULT_LOCALE
} from './config';
import axios from 'axios';
import {
    version
} from '../package.json';

var azure = require('botbuilder-azure');
import {
    load
} from 'dotenv';

const connector = new ChatConnector({
    appId: MICROSOFT_APP_ID,
    appPassword: MICROSOFT_APP_PASSWORD
});
const defaultAction = (session, args, next) => {
    console.log('default action');
    var rnd = Math.floor(Math.random() * phrase.length + 1);
    session.endDialog(phrase[rnd]);
}
var startBot = () => {
    console.log('Starting bot...');
    var bot = new UniversalBot(connector, defaultAction);
    var azureTableClient = new azure.AzureTableClient(AZURE_TABLE_NAME, AZURE_STORAGE_NAME, AZURE_STORAGE_KEY);
    var tableStorage = new azure.AzureBotStorage({
        gzipData: false
    }, azureTableClient);
    bot.set('storage', tableStorage);
    bot.set('persistConversationData', false);
    bot.set('persistUserData', true);

    bot.set('localizerSettings', {
        defaultLocale: DEFAULT_LOCALE
    });
    bot.connector('*', connector);
    bot.dialog('TestlDialog', (session) => {
        session.endConversation('Ok, Test are OK');
    }).triggerAction({
        matches: /test/
    });
    bot.dialog('VersionDialog', (session) => {
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
                    "Cache-Control": "no-cache",
                },
            })
            .then((response) => {
                session.endConversation(response);
            });
    }).triggerAction({
        matches: /clienti/
    });

    console.log('COPMPLETE ');
    return connector.listen();
};

export default startBot;
