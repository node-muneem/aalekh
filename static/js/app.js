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

function getStatusIconPath(status){
    switch(status){
        case "in progress":
        case "under development":
            return "static/img/inprogress.png";
        case "deprecated":
        case "discontinued":
        case "on hold":
            return "static/img/deprecated.png";
        case "ready to use":
        case "completed":
            return "static/img/readytouse.png";
        default:
            return "static/img/readytouse.png";
    }
}

function loadDetail(index){
    riot.mount("routedetail", { route: routesDetail[index] , index: index});
}

const appDetail = {

}
function getRouteDetails(){
    return routesDetail;
}
const routesDetail = [{
    uri : "/this/is/the/sample/route",
    when : "GET" ,
    to : "",
    after : ["" , ""],
    then : ["" , ""],
    aalekh : {
        description : "The purpose of creating this end point",
        status : "deprecated",
        params : {
            phone : "some description"
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