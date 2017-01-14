import fs from 'fs';
import magu from 'magu';
import footnote from '../dist/magu-plugin-footnote';

magu({}, [footnote()])
  .process(`${__dirname}/example.md`)
  .then(result => {
    console.log(result.html);
    fs.writeFileSync(`${__dirname}/index.html`, result.html, 'utf-8');
  });
