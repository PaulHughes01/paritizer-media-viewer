let theComponent;

import M from 'materialize-css';

const plugin = (component) => {
    theComponent = component;
    component.M = M;

    return component;
};

export default plugin;
