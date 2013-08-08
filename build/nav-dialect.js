/**
 * Nav Flavored Markdown dialect for markdown npm
 * allows for ``` code blocks
**/

var md = require('markdown');
// get Markdown class
var Markdown = md.markdown.Markdown;

// duck-punch existing header implementation - a lot of this is
// copied from that
Markdown.dialects.Gruber.block.atxHeader = function(block, next) {

  var m = block.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);

  if (!m)  {
    return undefined;
  }

  if (m[0].length < block.length) {
    next.unshift(Markdown.mk_block(block.substr( m[0].length ), block.trailing, block.lineNumber + 2));
  }

  var id = m[2].replace(/[\s]+/g, '-').replace(/[^-a-zA-Z0-9_]/g, '').toLowerCase();
  var anchor = '[AnchorLink](#' + id + ')';

  var header = ['h' + m[1].length, {id: id}];
  var text = m[2];

  if (m[1].length < 4) {
    var anchor = '[AnchorLink](#' + id + ')';
    text = anchor + text;
  }

  Array.prototype.push.apply(header, this.processInline(text));
  return [header];

};

