document.addEventListener( 'DOMContentLoaded', domReady, false );

function domReady() {
  console.log('yo');
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
