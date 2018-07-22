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

var routesDetail;

function fetchRouteDetails(){
    $.ajax({
        url: "docs",
        success: function(result){
            try{
                //routesDetail = JSON.parse(result);
                routesDetail = result;
                riot.mount('routelist' );
            }catch(err){
                console.log(err);
            }
        }
    });
}

fetchRouteDetails();