
//TODO:
//1. return the handler for docs, flow etc. So that user can register a route and decide env, after, then handlers etc.
//2. register before / after handlers. they'll report (request detail, time, route id etc.) to control unit which may either store the data locally or send to other server
//      reporting to central unit and it's processing should be in parallel or other thread
//3. anumargak should return the list of registered routers with router id.
//4. /stats will tell how is the application running (5 mins metrics) 
//        on the basis of beforeAll / afterAll, onError, onAnswer handlers
//5. /flow will tell detail about particular route
//        on the basis of before / after, onError, onAnswer handlers
//6. /stats, /flow will make a request to unit controlle
//      /#/list : list service will take the list of routers from anumargak route manager
            //onRoute event will help to build the list of routes.
//      /#/flow/route/{id} : route flow service will fetch data from central unit

const YAML = require('yamljs');
const fs = require('fs');
const path = require('path');

var docs = [];
module.exports = function(source){
    if(!source){
        throw Error("Aalekh: You need to pass valid parameter.");
    }
    
    if( typeof source === "string"){
        //source should be the valid path
        if(Array.isArray(source)){
            source.forEach(dir => {
                readDocs(dir);    
            })
        }else{
            readDocs(source);
        }

    }else{
        if(!source.after){
            throw Error("Aalekh: not a valid Muneem instance.");
        }

        source.after("addRoute", addDoc );
    }

    return requestHandler;
};

function readDocs(filepath){
    if (!fs.existsSync(filepath)) {
        cosole.log("error")
        throw new Error("Path for Aalekh document file/folder should either be absolute or relative to project directory: " + filepath);
    }

    if(fs.lstatSync(filepath).isDirectory()){
        const files = fs.readdirSync(filepath);
        for(let index in files){
            const fPath = path.join(filepath,files[index]);
            if(!fs.lstatSync(fPath).isDirectory() && fPath.endsWith(".yaml")){
                readDocsFromFile(fPath);
            }
        }
    }else{
        readDocsFromFile(filepath);
    }

}

function readDocsFromFile(filepath){
    try{
        const routes = YAML.parseFile(filepath);
        for(let i=0; i< routes.length; i++){
            addDoc(routes[i].route);
        }
    }catch(e){
        console.warn( "Aalekh: " + filepath + " is an invalid Yaml file or have syntax issues.");
        console.warn(e);
    }
}

function addDoc(route){
    if(route.aalekh !== false){

        if( !Array.isArray( route.when ) ){
            route.when = [ route.when ];
        }
        for(let i=0; i< route.when.length; i++){
            docs.push({
                uri: route.uri,
                when: route.when[i] || "GET",
                aalekh: route.aalekh || { status : "stable"}
            });
        }
    
    }
}

function requestHandler(asked,answer) {
    if(asked.params["*"].length < 2 || asked.params["*"].toLowerCase() === "index.html" ){
       answer.write(  fs.createReadStream( path.join(__dirname, "index.html") ) , "text/html; charset=UTF-8");
   }else{
        //check if the uri is valid
        var urlParts = asked.params["*"].split("/");
        if( checkForMaliciousUrl(asked.params["*"] )) {
            //asked.logger.warn("Aalekh:" + asked.params["*"] + " seems suspecious.");
            answer.end(404);
        }else if(urlParts[0] === "static"){
            readFileStream(asked, answer);
        }else if(urlParts.length === 1 && urlParts[0] === "docs"){//ajax
            var data = JSON.stringify(docs);
            answer.write(data, "application/json", data.length);
        }else{//invalid URL
            //asked.logger.warn("Aalekh:" + asked.params["*"] + " is not expected.");
            answer.end(404);
        }
   }
}

function checkForMaliciousUrl(url){
    if(url.indexOf("/../") > 0) { //directory attack
        return true;
    }else{
        return false;
    }
}

function readFileStream(asked,answer){
    var filePath = path.join(__dirname, asked.params["*"] );
    if (!fs.existsSync(filePath)) {//not found
        //asked.logger.warn("Aalekh:" + filePath + " is not found.");
        answer.end(404);
    }else{
        answer.write( fs.createReadStream(filePath) );
    }
}