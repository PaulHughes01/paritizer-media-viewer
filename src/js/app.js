// NPM Dependencies
import { component, install } from 'riot';
import App from '../components/app/app.riot';
import configPlugin from '../plugins/config-plugin.js';
import materializePlugin from '../plugins/materialize-plugin.js';

// Initialize
((window, data) => {
    const app = {
        data
    };

    // Install helpers
    install(materializePlugin);

    // Register the app component.
    const mountApp = component(App);

    // Add the <app> tag and mount it.
    const rootEl = document.body.appendChild(document.createElement('app'));
    mountApp(rootEl, { app });
})(window, appData);
