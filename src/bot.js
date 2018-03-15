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
            session.endDialog(`Memorizzato ${results.response}!`);
        }
    ]).triggerAction({
        matches: /buongiorno/
    });
    bot.dialog('DailyScrum',
        (session) => {
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

                        axios.post('https://rest.reviso.com/v2/invoices/drafts', {

                            method: 'post',
                            data: {
                                date: "2018-01-01",
                                currency: "EUR",
                                netAmount: 1000,
                                vatAmount: 20,
                                lines: [{
                                    quantity: 1,
                                    description: "Fattura giornaliera del cliente " + companyFound.name,
                                    product: {
                                        barred: false,
                                        departmentalDistribution: {
                                            departmentalDistributionNumber: 1,
                                            distributionType: "department",
                                            self: "https://rest.reviso.com/departmental-distribution/departments/1"
                                        },
                                        description: "giornata",

                                        name: "giornata",

                                        productGroup: {
                                            productGroupNumber: 22,
                                            self: "https://rest.reviso.com/product-groups/22"
                                        },
                                        productNumber: "gg",
                                        salesPrice: 500,
                                        self: "https://rest.reviso.com/products/gg"
                                    }
                                }],
                                paymentTerms: {
                                    daysOfCredit: 30,
                                    name: "30gg data fattura",
                                    paymentTermsNumber: 4,
                                    paymentTermsType: "net",
                                    self: "https://rest.reviso.com/payment-terms/4"
                                },
                                recipient: {
                                    address: "Piazza Spirito Santo",
                                    balance: 0,
                                    city: "CATANIA",
                                    contacts: "https://rest.reviso.com/customers/1/contacts",
                                    corporateIdentificationNumber: "02250850874",
                                    country: "ITALIA",
                                    countryCode: {
                                        code: "IT",
                                        self: "https://rest.reviso.com/country-codes/IT"
                                    },
                                    currency: "EUR",
                                    customerGroup: {
                                        customerGroupNumber: 1,
                                        self: "https://rest.reviso.com/customer-groups/1"
                                    },
                                    email: "francesco.barbera@mondora.com",
                                    italianCustomerType: "none",
                                    lastUpdated: "2018-03-14T10:11:15Z",
                                    paymentTerms: {
                                        paymentTermsNumber: 9,
                                        self: "https://rest.reviso.com/payment-terms/9"
                                    },
                                    splitPayment: false,

                                    vatNumber: "02250850874",
                                    vatZone: {
                                        vatZoneNumber: 1,
                                        self: "https://rest.reviso.com/vat-zones/1"
                                    },
                                    zip: "95124",
                                    customerNumber: 1,
                                    name: "Neri Franco & C. snc",
                                    self: "https://rest.reviso.com/customers/1"

                                },
                                "customer": {
                                    address: "Piazza Spirito Santo",
                                    balance: 0,
                                    city: "CATANIA",
                                    contacts: "https://rest.reviso.com/customers/1/contacts",
                                    corporateIdentificationNumber: "02250850874",
                                    country: "ITALIA",
                                    countryCode: {
                                        code: "IT",
                                        self: "https://rest.reviso.com/country-codes/IT"
                                    },
                                    currency: "EUR",
                                    customerGroup: {
                                        customerGroupNumber: 1,
                                        self: "https://rest.reviso.com/customer-groups/1"
                                    },
                                    email: "francesco.barbera@mondora.com",
                                    italianCustomerType: "none",
                                    lastUpdated: "2018-03-14T10:11:15Z",
                                    paymentTerms: {
                                        paymentTermsNumber: 9,
                                        self: "https://rest.reviso.com/payment-terms/9"
                                    },
                                    splitPayment: false,

                                    vatNumber: "02250850874",
                                    vatZone: {
                                        vatZoneNumber: 1,
                                        self: "https://rest.reviso.com/vat-zones/1"
                                    },
                                    zip: "95124",
                                    customerNumber: 1,
                                    name: "Neri Franco & C. snc",
                                    self: "https://rest.reviso.com/customers/1"


                                }
                            }
                        }).catch(ex => console.log(ex));



                        console.log(session.userData);
                    } else {
                        session.send('Nessuna azienda corrispondente, selezionane una fra le seguenti');
                        session.send(companies.map(cmp => cmp.name).join('  \n '));
                    }
                });

        }
    ).triggerAction({
        matches: /oggi\ ho\ lavorato\ per/
    });
    console.log('COPMPLETE ');
    return connector.listen();
};

export default startBot;
