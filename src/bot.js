import {
    UniversalBot,
    MemoryBotStorage,
    LuisRecognizer,
    IntentDialog,
    ChatConnector,
    AzureTableClient,
    Session,
    Prompts,
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
    session.send('Come posso esserti utile?');
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
        session.endConversation('Version ' + version);
    }).triggerAction({
        matches: /version/
    });
    bot.dialog('FirstStart', [
        (session) => {
            Prompts.text(session, 'Qual\'è il tuo costo giornaliero?');
        },
        (session, results) => {
            session.endDialog(`Memorizzato il costo di ${results.response} EUR!`);
        }
    ]).triggerAction({
        matches: /buongiorno/
    });
    bot.dialog('DailyScrumW', [
        session => {
            const txt = session.message.text;
            const phrase = 'oggi ho lavorato per';
            var company = txt.slice(txt.indexOf(phrase) + phrase.length + 1).toLowerCase();
            axios({
                    method: 'get',
                    url: 'https://rest.reviso.com/customers',
                    headers: {
                        "X-AppSecretToken": "SxQv1oTvGSstuYIEKpgBDKbzMccUMVDBEhIeRUriY3M1 ",
                        "X-AgreementGrantToken": "VEvSFx42bWzeBSRP8PQ92xBvXEhbaWO79k9XsGlMelg1 "
                    },
                })
                .then(async (response) => {
                    console.log('company ' + company);
                    const companies = response.data.collection;
                    const companyFound = companies.find(element => element.name.toLowerCase().indexOf(company) >= 0);
                    if (companyFound) {
                        session.send('Consuntivato il lavoro per ' + companyFound.name);
                        session.userData.worked = {};
                        session.userData.worked.date = new Date();
                        session.userData.worked.company = companyFound;
                        Prompts.text(session, 'Qual\'è la tariffa per questo cliente?');
                    } else {
                        session.send('Nessuna azienda corrispondente, selezionane una fra le seguenti');
                        session.send(companies.map(cmp => cmp.name).join('  \n '));
                    }
                });

        },
        (session, results) => {
            session.endDialog(`Tariffa di ${results.response} EUR memorizzata!`);
        }
    ]).triggerAction({
        matches: /oggi\ ho\ lavorato\ per/
    });
    bot.dialog('DailyScrumS',
        session => {
            const txt = session.message.text;
            const phrase = 'oggi ho fatto formazione su';
            var argument = txt.slice(txt.indexOf(phrase) + phrase.length + 1).toLowerCase();
            session.send('Consuntivata la formazione su ' + argument);
        }
    ).triggerAction({
        matches: /oggi\ ho\ fatto\ formazione\ su/
    });
    return connector.listen();
};

export default startBot;
