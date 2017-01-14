import fs from 'fs';
import test from 'ava';
import marked from 'marked';
import cheerio from 'cheerio';
import footnote from '../dist/magu-plugin-footnote';

const md = fs.readFileSync(`${__dirname}/fixtures.md`, 'utf-8');

test.beforeEach(t => {
  t.context.$ = cheerio.load(marked(md));
});

test('footnote', t => {
  const result = footnote()(t.context.$).html();

  t.regex(result, /id="something-footnote"/);
  t.regex(result, /href="#footer-something-footnote"/);
  t.regex(result, /id="footer-something-footnote"/);
  t.regex(result, /href="#something-footnote"/);
});

test('Setting footnoteTemplate', t => {
  const result = footnote({
    footnoteTemplate: '<foo></foo>'
  })(t.context.$).html();

  t.regex(result, /<foo><\/foo>/);
});

test('Setting footerFootnote{List,Item}Template', t => {
  const result = footnote({
    footerFootnoteListTemplate: '<foo></foo>',
    footerFootnoteItemTemplate: '<bar></bar>'
  })(t.context.$).html();

  t.regex(result, /<foo><bar><\/bar><\/foo>/);
});
