riot.tag2('routedetail', '<div class="url"> <button class="{opts.route.when} btn btn-md">{opts.route.when}</button> <span> <span class="align-middle" each="{urlPart,index in this.urlParts}"> <span class="{url-param: urlPart.isParam}" tooltip="tooltip-{urlPart.p_name}">/{urlPart.p_name}</span> <div if="{urlPart.isParam}" class="param-tooltip" id="tooltip-{urlPart.p_name}" data="{urlPart.description}"></div> </span> </span> <i class="{getStatusIconClass( opts.route.aalekh.status)} float-right" style="font-size: xx-large"></i> </div> <br> <p class="route-description">{opts.route.aalekh.description}</p> <div class="form-group"> <select class="form-control form-control-sm" id="select-scenarios" onchange="{displayScenario}"> <option selected="true" disabled="true">Select a scenario</option> <option each="{scenario, index in opts.route.aalekh.scenarios}" riot-value="{index}">{scenario.description}</option> </select> </div>', '', '', function(opts) {
        var tag = this;
        tag.displayScenario = function(e){
            riot.mount("scenario", { scenario : opts.route.aalekh.scenarios[e.target.value] })
        }

        tag.isParam = function(urlPart){
            return urlPart.startsWith(":");
        }

        var paramRegexStr = new RegExp(":([^\\/\\-\\(]+)-?(\\(.*?\\))?");

        tag.paramParts = function(urlPart){

            if(this.isParam(urlPart)){
                var matches = paramRegexStr.exec(urlPart);
                var paramPart = { p_name : matches[1], p_type : matches[2], isParam : true};
                paramPart.description =  this.displayParamDetail(paramPart);
                return paramPart;
            }else{
                return {p_name : urlPart, isParam : false };
            }
        }
        tag.displayParamDetail = function(param){
            var description = "";
            if( opts.route.aalekh.params && opts.route.aalekh.params[ param.p_name ] ){
                description += "<p>" + opts.route.aalekh.params[ param.p_name ] + "</p>";
            }

            if(param.p_type){
                description += "<p>" + param.p_type  + "</p>";
            }

            return description;
        }

        var urlParts = opts.route.uri.substr(1).split('/');
        this.urlParts = [];
        urlParts.forEach(urlPart => {
            this.urlParts.push( this.paramParts(urlPart) )
        });

        this.on('mount', function(){
            var tooltipId = $(".url-param").attr("tooltip");

            $(".url-param").each( function(el){
                var tooltipId =  $(this).attr("tooltip");
                $("#"+ tooltipId)
                    .css({
                        top : ($(this).position().top + $(this).height() )+ 10 + "px",
                        left : $(this).position().left + "px"
                    }).html($("#"+ tooltipId).attr("data"))
                    .hide();
            })

            $(".url-param").mouseover(function(){
                var tooltipId = $(this).attr("tooltip");
                $("#"+tooltipId).show();
            })

            $(".url-param").mouseout(function(){
                var tooltipId = $(this).attr("tooltip");
                $("#"+tooltipId).hide();
            })
        });
});
riot.tag2('routelist', '<input id="route-filter" class="form-control form-control-sm" name="route-filter" type="text" onkeyup="{filter}"> <div each="{route,index in routesDetail}"> <div class="route {getStatusIconClass(route.aalekh.status)}-bg" onclick="{itemClick}"> <i class="route-status {getStatusIconClass(route.aalekh.status)}"></i> <button class="method {route.when} btn btn-sm">{route.when}</button> <span>{route.uri}</span> </div> </div>', 'routelist .route,[data-is="routelist"] .route{ padding: 5px; cursor: pointer; } routelist .selected,[data-is="routelist"] .selected,routelist .route:hover,[data-is="routelist"] .route:hover{ background-color : darkseagreen }', '', function(opts) {
        var tag = this;
        tag.itemClick = function(event){
            $(".route").removeClass("selected");
            $(event.target).parent(".route").addClass("selected");
            riot.mount("routedetail", { route: routesDetail[event.item.index]});
        }

        tag.filter = function(event){
            var text = $(event.target).val();
            if(text === ""){
                $(".route").show();
            }else{
                text= text.toLowerCase();
                $(".route").hide();
                $(".route").each( function(){
                    if( $(this).html().toLowerCase().indexOf( text ) > -1 ){
                        $(this).show();
                    }
                });
            }
        }
});
riot.tag2('scenario', '<div class="rr"> <div>Content Type: {opts.scenario.type}</div> <table> <thead> <tr> <td>Request</td> <td>Response : {opts.scenario.response.status}</td> </tr> </thead> <tbody> <tr> <td>Headers</td> <td></td> </tr> <tr> <td><pre id="req-headers">{opts.scenario.request.headers}</pre><br></td> <td><pre id="req-headers">{opts.scenario.response.headers}</pre><br></td> </tr> <tr> <td>Payload</td> <td></td> </tr> <tr> <td><pre id="req-payload">{opts.scenario.request.payload}</pre><br></td> <td><pre id="req-payload">{opts.scenario.response.payload}</pre><br></td> </tr> </tbody> </table> </div>', '', '', function(opts) {
});