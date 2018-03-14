import {
    UniversalBot,
    MemoryBotStorage,
    LuisRecognizer,
    IntentDialog,
    ChatConnector,
    AzureTableClient,
    Session
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

import {
    version
} from '../package.json';

import {
    action as defaultAction
} from './dialog/default';

var azure = require('botbuilder-azure');
import loader from './loader';
import {
    load
} from 'dotenv';

const connector = new ChatConnector({
    appId: MICROSOFT_APP_ID,
    appPassword: MICROSOFT_APP_PASSWORD
});

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
    bot.set('IIntentRecognizerSetOptions', {
        intentThreshold: LUIS_INTENTS_THRESHOLD
    });
    bot.recognizer(new LuisRecognizer(LUIS_RECOGNIZER_URLS));
    bot.connector('*', connector);
    bot.recognizer(new builder.RegExpRecognizer('TestIntent', 'testme'));
    bot.dialog('TestlDialog', function (session) {
        session.endConversation('Ok, I\'m ALIVE!!.');
    }).triggerAction({
        matches: 'TestIntent'
    });
    console.log('COPMPLETE ');
    console.log('bot version: ' + version);
    return connector.listen();
};

export default startBot;
