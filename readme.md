# Header Cookie Manager


ExpressJs middleware to manage cookies using request headers.



### Setting & Clearing Cookies Via Header Values

```
header.set('x-chm-set-cookie', '<cookie-name>=<my-cookie-value>')
header.set('x-chm-clear-cookie', '<cookie-name>')
```


### Install & Usage

``` sh
npm install github:sreal/cookie-header-manager --save
```


``` javascript
/// express-server.js

var cookieManager = require('./header-cookies-manager');

server.use(cookieManager());

```
