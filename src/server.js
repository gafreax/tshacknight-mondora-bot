import 'babel-polyfill';
import bunyanRequest from 'bunyan-request';
import cors from 'cors';
import express from 'express';

import startBot from './bot';
import {
    HOSTNAME,
    PORT
} from './config';
import {
    version
} from '../package.json';

const connectorListener = startBot();
console.log('LOADING SERVER');
express()
    .use(express.static('assets'))
    .post('/api/messages', connectorListener)
    .get('/', (req, res) => {
        //const html = "<iframe src='https://webchat.botframework.com/embed/ts-mysupport-chatbot?s=MjIHNBVsg2s.cwA.yMM.CflNdwIK6BS5S9lQGO_vIMcrnLa4dWoglQG9R5Bcnw8'></iframe>";
        res.send(`<h2><i>Team System</i> hacknight</h2>  <h5>v:${version}</h5>`);
    })
    .listen(PORT, () => {
        console.log(`TS Hacknight MONDORA Bot Server listening on ${HOSTNAME}:${PORT}`);
    });
