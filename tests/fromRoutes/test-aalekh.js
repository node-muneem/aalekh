var Muneem = require("muneem");
var path = require("path");
var muneem = new Muneem({
    mappings : path.join(__dirname, "routeMapping.yaml")
});
var aalekh = require("./../../index")(muneem);

//muneem.add("handler", aalekh, "aalekh");

muneem.add("route",{
    uri : "/aalekh/*",
    when : "GET",
    to : aalekh,
    aalekh : false
})

muneem.start();