<routedetail>
    <div id="status-icon">
        <img src="{ getStatusIconPath( opts.route.aalekh.status) }" width="30px">
    </div>
    <div class="url">
        <button class="{ opts.route.when } btn btn-md">{ opts.route.when }</button>
        <span class="align-middle" each={urlPart,index in this.urlParts }>
            <!-- { urlPart.p_name} -->
            <span class={ url-param: urlPart.isParam } tooltip="tooltip-{ urlPart.p_name }" >/{ urlPart.p_name }</span>
            <div if={ urlPart.isParam }  class="param-tooltip" id="tooltip-{ urlPart.p_name }" data={ urlPart.description }/>
        </span>
    </div>
    <br>
    <p class="route-description">{ opts.route.aalekh.description }</p>
    <div class="form-group">
        <select class="form-control form-control-sm" id="select-scenarios" onchange={displayScenario}>
            <option selected="true" disabled="true">Select a scenario</option>
            <option each={ scenario, index in opts.route.aalekh.scenarios } value= "{ index }" >{ scenario.description }</option>
        </select>
    </div>

    <script>

        displayScenario(e){
            riot.mount("scenario", { scenario : opts.route.aalekh.scenarios[e.target.value] })
        }

        isParam(urlPart){
            return urlPart.startsWith(":");
        }

        var paramRegexStr = new RegExp(":([^\\/\\-\\(]+)-?(\\(.*?\\))?");

        paramParts(urlPart){
            //:param
            //:param([regx]+)
            //:param(:TYPE:)
            //:param(fixed|values)
            if(this.isParam(urlPart)){
                var matches = paramRegexStr.exec(urlPart);
                var paramPart = { p_name : matches[1], p_type : matches[2], isParam : true};
                paramPart.description =  this.displayParamDetail(paramPart);
                return paramPart;
            }else{
                return {p_name : urlPart, isParam : false };
            }
        }
        displayParamDetail(param){
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
    </script>
</routedetail>