'use strict';
var request  = require('request');
var Hogan    = require('hogan.js');
var path     = require('path');
var markdown = require('markdown').markdown;
var fs       = require('fs');
// enable GitHub Flavored Markdown dialect
require('./gfm-dialect.js');
require('./nav-dialect.js');
var url      = 'https://raw.github.com/bower/bower/master/README.md';
var template = Hogan.compile(fs.readFileSync(path.join(__dirname,'./template.{'), 'utf-8'));

request(url, function (error, response, body) {
  body = body.replace(/ \[\!\[Build Status\].+$/m, '');
  //assuming that links not containing http are relative to bower main repo
  body = body.replace(/\[(.*)\]\((?!http)(.*)\)/g, '\[\$1\](https://github.com/bower/bower/blob/master/\$2\)');
  var bodyHTML = markdown.toHTML(body, 'GitHub'),
    sections = [],
    nav = [],
    pos;

  // Divide the page up by h2 tags
  while ( bodyHTML.length > 0 ) {
    pos = bodyHTML.indexOf('<h2 ', 1);
    if ( pos > -1 ) {
      sections.push(bodyHTML.substring(0, pos));
      bodyHTML = bodyHTML.substr(pos);
    }
    else {
      sections.push(bodyHTML);
      bodyHTML = '';
    }
  }

  // Create sections with navigation
  sections = sections.map(function(section) {
    var header = /h\d id="(.*?)"/.exec(section)[1];
    var display = /<h\d id=".*?"><a href="#.*?">AnchorLink<\/a>(.*?)<\/h\d>/.exec(section)[1];

    nav.push([header, display]);
    return '<div id="section-'+header+'">' +
      section +
      '<a class="back-to-top" href="#hero">Back to the top</a>' +
      '</div>';
  }).join('\n');

  nav = nav.map(function(nav) {
    nav[1] = nav[1] === 'BOWER' ? 'Home' : nav[1];
    return '<li><a href="#section-'+nav[0]+'">'+nav[1]+'</a></li>';
  }).join('\n');

  fs.writeFileSync(path.join(__dirname, '../index.html'), template.render({
    body: sections,
    navigation: nav
  }));
});
