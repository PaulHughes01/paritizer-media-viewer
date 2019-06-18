import * as riot from 'riot';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('', { url: 'http://localhost/' });

global.document = window.document;
global.window = window;
global.history = window.history;
global.Node = window.Node; // RiotJS uses this API
