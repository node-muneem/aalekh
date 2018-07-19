var methodColorMapping = {
    GET : "green",
    HEAD : "#6ad346",
    PUT : "orange",
    POST : "yellow",
    DELETE : "red",
    OPTIONS : "#0099f6",
    PATCH : "cyan",
    TRACE : "#009c87",
    CONNECT : "#c574b8",
    COPY : "#f76aa1",
    LINK : "#145c85",
    UNLINK : "#59859e",
    PURGE : "#ff6633",
    LOCK : "#25bfdd",
    UNLOCK : "#008299",
    PROPFIND : "#00e198",
    VIEW: "#fec900"
}

function getStatusIconClass(status){
    switch(status){
        case "in progress":
        case "under development":
        case "unstable":
            return "icon-traffic-cone";
        case "deprecated":
        case "discontinued":
        case "on hold":
            return "icon-attention";
        case "ready to use":
        case "completed":
        case "stable":
            return "icon-ok";
        default:
            return "icon-ok";
    }
}

function loadDetail(index){
    riot.mount("routedetail", { route: routesDetail[index] , index: index});
}

var appDetail = {

}

function getRouteDetails(){
    return routesDetail;
}
var routesDetail = [{
    uri : "/this/is/the/sample/:route(amit|gupta)",
    when : "GET" ,
    to : "",
    after : ["" , ""],
    then : ["" , ""],
    aalekh : {
        description : "The purpose of creating this end point",
        status : "deprecated",
        params : {
            route : "some description"
        },
        scenarios : [{
            description: "Successful response",
            request : {
                payload : "",
                headers : ""
            },
            response : {
                status: "201",
                payload : "Successful",
                headers : ""
            },
            type : "content/type"
        },{
            description: "Error response",
            request : {
                payload : "",
                headers : ""
            },
            response : {
                status: "500",
                payload : "Error",
                headers : ""
            },
            type : "content/type"
        }]
    }
}];