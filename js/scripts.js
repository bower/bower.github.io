document.addEventListener( 'DOMContentLoaded', domReady, false );

function domReady() {
  addAnchors()
  addGlobalToc()
}

// create anchor links for headers
function addAnchors() {
  var headers = document.querySelectorAll('.main h2, .main h3, .main h4');

  for ( var i=0, len = headers.length; i < len; i++ ) {
    var header = headers[i];
    var anchor = document.createElement('a');
    anchor.href = '#' + header.id;
    anchor.textContent = '§';
    anchor.className = 'header-anchor';
    header.insertBefore( anchor, header.firstChild );
  }
}

// insert TOC to sidebar
function addGlobalToc() {
  var headers = document.querySelectorAll('.main h2');
  var selector = '.site-nav a[href="' + window.location.pathname + '"]';
  var currentNav = document.querySelector(selector).parentNode;

  var ul = document.createElement('ul');
  for ( var i=0, len = headers.length; i < len; i++ ) {
    var header = headers[i];
    var li = document.createElement('li');
    var anchor = document.createElement('a');
    anchor.href = '#' + header.id;
    anchor.textContent = header.lastChild.textContent;
    li.insertBefore( anchor, null );
    ul.insertBefore( li, null );
  }
  currentNav.insertBefore( ul, null );
}
