# आलेख (Aalekh)
Documentation library like swagger for मुनीम (Muneem) framework.

<div style="text-align: center;">
<img src="static/img/aalekh_logo.png" width="200px" >
</div>

Example: When documents are saves in separate file
```js
var path = require("path");
var Muneem = require("muneem");
var docsHandler = require("aalekh")( (path.join(__dirname, "mappings/docs.yaml")  );

var muneem = new Muneem();

//muneem.add("handler", aalekh, "docsHandler");

muneem.add("route",{
    uri : "/aalekh/*",
    when : "GET",
    to : docsHandler,
    compress : false
})

muneem.start();
```


Example: When documents are attached with routes mapping
```js
var Muneem = require("muneem");
var path = require("path");
var muneem = new Muneem({
    mappings : path.join(__dirname, "routeMapping.yaml")
});
var docsHandler = require("aalekh")(muneem);

//muneem.add("handler", aalekh, "docsHandler");

muneem.add("route",{
    uri : "/aalekh/*",
    when : "GET",
    to : docsHandler,
    compress : false,
    aalekh : false
})

muneem.start();
```
