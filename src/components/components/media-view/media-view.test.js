import { assert } from 'chai';
import { component } from 'riot';

//const MediaView = require('./media-view.riot');

import MediaView from './media-view.riot';

const tagName = 'media-view';
const mountTag = component(MediaView);

describe(`${tagName} tag`, () => {
    let html;

    beforeEach(() => {
        html = document.createElement(tagName);
        document.body.appendChild(html);
    });

    afterEach(() => {
        html.remove();
    });

    it('should exist', () => {
        const tag = mountTag(html);
        assert.exists(tag);
    });

    it('should render the image tag with the proper src value', () => {
        const url = 'https://via.placeholder.com/500x300.png';
        const tag = mountTag(html, { imageUrl: url });
        console.log(document.body.innerHTML);
        const el = document.body.querySelector('img');

        assert.equal(el.src, url);
    });

    it('should accept the prop as a tag attribute', () => {
        const url = 'https://via.placeholder.com/500x300.png';
        html.setAttribute('image-url', url); // Dash notation becomes camelcase
        const tag = mountTag(html);
        const el = document.body.querySelector('img');

        assert.equal(el.src, url);
    });
});
