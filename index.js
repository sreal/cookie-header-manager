'use strict';

module.exports = headerCookiesManager;

function headerCookiesManager() {

  function setCookies(header, response) {
    if(!header) { return; }

    var splitPos = header.indexOf('=');
    if (splitPos === -1){
      response.cookie(header, '');
    } else {
      response.cookie(header.substr(0, splitPos),
                      header.substr(splitPos+1));
    }
  };

  function clearCookies(header, response) {
    if (!header) { return; }

    var splitKeys = header.split(',');
    for (var i=0;i< splitKeys.length;i++) {
      response.clearCookies(splitKeys[i].trimLeft());
    }
  }


  return function headerCookiesManager(request, response, next) {
    if (!next) { return; }
    if (!request || !response || !request.headers) { next(); return; }

    setCookies(request.headers['x-chm-set-cookie'], response);
    clearCookies(request.headers['x-chm-clear-cookie'], response);

    next();
  };
}
