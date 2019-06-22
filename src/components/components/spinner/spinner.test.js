import { assert } from 'chai';
import { component } from 'riot';

import * as Spinner from './spinner.riot';

const tagName = 'spinner';
const mountTag = component(Spinner.default);

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

    it('should have a div with the spinner in it', () => {
        const tag = mountTag(html, {});
        console.log(document.body.innerHTML);
        const el = document.body.querySelector('.circle');

        assert.exists(el);
    });
});
