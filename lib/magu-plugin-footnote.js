import pupa from 'pupa';
import voca from 'voca';

const defaultOpts = {
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
};
export {defaultOpts};

export default function footnote(opts = {}) {
  opts = Object.assign({}, defaultOpts, opts);
  return $ => {
    const items = [];
    $(opts.selector).each((idx, elem) => {
      const $elem = $(elem);
      const data = format(idx + 1, $elem, opts.footnoteTemplate);
      $elem.replaceWith(data.elem);
      items.push(pupa(opts.footerFootnoteItemTemplate, data));
    });
    const $list = $(opts.footerFootnoteListTemplate).appendTo($.root());
    items.forEach(item => {
      $list.append(item);
    });
    return $;
  };
}

function format(idx, $elem, template) {
  const text = $elem.attr('href').slice(1);
  const footerText = $elem.text();
  const id = voca.kebabCase(text);
  const href = 'footer-' + voca.kebabCase(text);
  const opts = {idx, id, href, text, footerText};
  const elem = pupa(template, opts);
  return Object.assign(opts, {elem});
}
export {format};
