let theComponent;

/**
 * GetConfig
 * Gets the value of a config field, or null if it does not exist
 *
 * @param {string} name - The name of the config value
 * @return {mixed} - The value
 */
const getConfig = (name) => {
    const { app } = theComponent.props;
    return app.data && app.data.options && typeof app.data.options[name] !== 'undefined'
        ? app.data.options[name]
        : null;
};

/**
 * Plugin
 * The plugin
 *
 * @param {object} component - The component
 * @return {object} component - The modified component
 */
const plugin = (component) => {
    theComponent = component;
    component.getConfig = getConfig;

    return component;
};

export default plugin;
