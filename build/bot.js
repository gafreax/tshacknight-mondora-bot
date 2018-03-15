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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    bot.dialog('FirstStart', [function (session) {
        _botbuilder.Prompts.text(session, 'Qual\'è il tuo costo giornaliero?');
    }, function (session, results) {
        session.endDialog('Memorizzato ' + results.response + '!');
    }]).triggerAction({
        matches: /\/start/
    });
    bot.dialog('DailyScrum', function (session) {
        var txt = session.message.text;
        var phrase = 'oggi ho lavorato per';
        var company = txt.slice(txt.indexOf(phrase) + phrase.length + 1).toLowerCase();
        (0, _axios2.default)({
            method: 'get',
            url: 'https://rest.reviso.com/customers',
            headers: {
                "X-AppSecretToken": "SxQv1oTvGSstuYIEKpgBDKbzMccUMVDBEhIeRUriY3M1 ",
                "X-AgreementGrantToken": "VEvSFx42bWzeBSRP8PQ92xBvXEhbaWO79k9XsGlMelg1 "
            }
        }).then(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
                var companies, companyFound;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log('company ' + company);
                                companies = response.data.collection;
                                companyFound = companies.find(function (element) {
                                    return element.name.toLowerCase().indexOf(company) >= 0;
                                });

                                if (!companyFound) {
                                    _context.next = 13;
                                    break;
                                }

                                _context.next = 6;
                                return session.send('Consuntivato il lavoro per ' + companyFound.name);

                            case 6:
                                session.userData.worked = {};
                                session.userData.worked.date = new Date();
                                session.userData.worked.company = companyFound;

                                _axios2.default.post('https://rest.reviso.com/v2/invoices/drafts', {

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
                                }).catch(function (ex) {
                                    return console.log(ex);
                                });

                                console.log(session.userData);
                                _context.next = 15;
                                break;

                            case 13:
                                session.send('Nessuna azienda corrispondente, selezionane una fra le seguenti');
                                session.send(companies.map(function (cmp) {
                                    return cmp.name;
                                }).join('  \n '));

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }());
    }).triggerAction({
        matches: /oggi\ ho\ lavorato\ per/
    });
    console.log('COPMPLETE ');
    return connector.listen();
};

exports.default = startBot;
//# sourceMappingURL=bot.js.map