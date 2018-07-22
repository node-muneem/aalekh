var Muneem = require("muneem");
var path = require("path");
var muneem = new Muneem({
    compress : false
});
var aalekh = require("./../../index")(path.join(__dirname, "aalekhMapping.yaml") );

muneem.add("handler", aalekh, "aalekh");//TODO: make it optional

muneem.add("route",{
    uri : "/aalekh/*",
    when : "GET",
    to : "aalekh"//TODO: pass handler object directly
})

muneem.start();