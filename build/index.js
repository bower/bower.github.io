var request  = require('request');
var Hogan    = require('hogan.js');
var path     = require('path');
var markdown = require('markdown').markdown;
var fs       = require('fs');
// enable GitHub Flavored Markdown dialect
require('./gfm-dialect.js');
require('./nav-dialect.js');
var url      = "https://raw.github.com/bower/bower/master/README.md";
var template = Hogan.compile(fs.readFileSync(path.join(__dirname,'./template.{'), 'utf-8'));

request(url, function (error, response, body) {
  body = body.replace(/ \[\!\[Build Status\].+$/m, '')
  //assuming that links not containing http are relative to bower main repo
  body = body.replace(/\[(.*)\]\((?!http)(.*)\)/g, '\[\$1\](https://github.com/bower/bower/blob/master/\$2\)')
  var bodyHTML = markdown.toHTML(body, 'GitHub');
  fs.writeFileSync(path.join(__dirname, '../index.html'), template.render({ body: bodyHTML }));
});
