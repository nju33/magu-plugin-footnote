# magu-plugin-footnote

[Magu](https://github.com/nju33/magu) plugin that create footnotes.

[![Build Status](https://travis-ci.org/nju33/magu-plugin-footnote.svg?branch=master)](https://travis-ci.org/nju33/magu-plugin-footnote) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Install

```bash
yarn add magu-plugin-footnote
npm install magu-plugin-footnote
```

## Usage

```js
magu({}, [footnote({
  // Below is the default value
  selector: 'a[href^="*"]',
  footnoteTemplate: `
<span class=footernote__text>{text}</span>
<small class=footernote__link-small>
  ※<a id={id} class=footnote__link href=#{href}>{idx}</a>
</small>
  `.trim(),
  footerFootnoteListTemplate: '<ol class="footer-footnote__list"></ol>',
  footerFootnoteItemTemplate: `
<li class=footer-footnote__item>
  <span class=footer-footnote__text>{footerText}</span>
  <a id={href} href=#{id} class=footer-footnote__link>⇧</a>
</li>
  `.trim()
})])
  .process(`${__dirname}/example.md`)
  .then(result => console.log(result.html));
```

### Options

- `selector`(default: `a[href^="*"]`)
  <div>Specify selector for footnote</div>
- `footnoteTemplate`
  <div>Specify the footnote template in the original position</div>
- `footerFootnoteListTemplate`
  <div>Specify template to put footnote list in footer</div>
- `footerFootnoteItemTemplate`
  <div>Specify footnote template in footer</div>

The above template is given the same options like `{idx, id, href, text, footerText}`

Please think that it is being processed using [sindresorhus/pupa](https://github.com/sindresorhus/pupa) as follows

```js
pupa(***Template, opts);
```



## Example

If the `${__dirname}/example.md` of the **Usage** section is as follows

```md
foooooooooo[abcde](*aiueo)foooooooo

barrrrrrrrr[かきく](*kakiku)barrrrrr
```

result like this

```html
<p>foooooooooo<span class="footernote__text">aiueo</span>
  <small class="footernote__link-small">
  ※<a id="aiueo" class="footnote__link" href="#footer-aiueo">1</a>
</small>foooooooo</p>
<p>barrrrrrrrr<span class="footernote__text">kakiku</span>
  <small class="footernote__link-small">
  ※<a id="kakiku" class="footnote__link" href="#footer-kakiku">2</a>
</small>barrrrrr</p>
<ol class="footer-footnote__list">
  <li class="footer-footnote__item">
    <span class="footer-footnote__text">abcde</span>
    <a id="footer-aiueo" href="#aiueo" class="footer-footnote__link">⇧</a>
  </li>
  <li class="footer-footnote__item">
    <span class="footer-footnote__text">かきく</span>
    <a id="footer-kakiku" href="#kakiku" class="footer-footnote__link">⇧</a>
  </li>
</ol>
```

## License

The MIT License (MIT)
Copyright (c) 2016 nju33 <nju33.ki@gmail.com>
