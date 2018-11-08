var Muneem = require("muneem");
var path = require("path");
var muneem = new Muneem();
var aalekh = require("./../../index")(path.join(__dirname, "aalekhMapping.yaml") );

//muneem.add("handler", aalekh, "aalekh");

muneem.add("route",{
    uri : "/aalekh/*",
    when : "GET",
    to : aalekh
})

muneem.start();