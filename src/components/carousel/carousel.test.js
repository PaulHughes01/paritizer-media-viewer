import { assert } from 'chai';
import { component } from 'riot';

const Carousel = require('./carousel.riot');

const tagName = 'carousel';
const mountTag = component(Carousel);

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

    it('should cycle through the list of URLs based on the duration', () => {
        const urls = [
            'https://picsum.photos/id/1/200/300.jpg',
            'https://picsum.photos/id/2/200/300.jpg',
            'https://picsum.photos/id/3/200/300.jpg',
        ];

        const props = {
            urls,
            duration: 2000,
        };

        const tag = mountTag(html, props);
        console.log(tag);
        console.log(document.body.innerHTML);

        const el = document.body.querySelector('img');
        assert.equal(el.src, urls[0]);
    });
});
