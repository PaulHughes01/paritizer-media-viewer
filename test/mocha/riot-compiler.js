// Derived from https://jaketrent.com/post/testing-es2015-riot-tags/
import * as fs from 'fs';
import { compile } from '@riotjs/compiler';

// override behavior for riot tag import - per https://github.com/mochajs/mocha/issues/1458
require.extensions['.riot'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8');
    const riotCompiled = compile(content);
    return module._compile(riotCompiled.code, filename); // eslint-disable-line no-underscore-dangle
};
