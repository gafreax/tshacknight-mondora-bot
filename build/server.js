'use strict';

require('babel-polyfill');

var _bunyanRequest = require('bunyan-request');

var _bunyanRequest2 = _interopRequireDefault(_bunyanRequest);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bot = require('./bot');

var _bot2 = _interopRequireDefault(_bot);

var _config = require('./config');

var _package = require('../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectorListener = (0, _bot2.default)();
console.log('LOADING SERVER');
(0, _express2.default)().use(_express2.default.static('assets')).post('/api/messages', connectorListener).get('/', function (req, res) {
    res.send('<h2><i>Team System</i> hacknight</h2>  <h5>v:' + _package.version + '</h5>');
}).listen(_config.PORT, function () {
    console.log('TS Hacknight MONDORA Bot Server listening on ' + _config.HOSTNAME + ':' + _config.PORT);
});
//# sourceMappingURL=server.js.map