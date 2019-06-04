// NPM Dependencies
import { component, install } from 'riot';
import App from '../modules/app/app.riot';
import configHelper from '../helpers/config-helper.js';

// Initialize
((window, data) => {
    const app = {
        data
    };

    // Install helpers
    install(configHelper);

    // Register the app component.
    const mountApp = component(App);

    // Add the <app> tag and mount it.
    const rootEl = document.body.appendChild(document.createElement('app'));
    mountApp(rootEl, { app });
})(window, appData);
