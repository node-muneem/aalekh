<routelist>
    <input id="route-filter" class="form-control form-control-sm" name="route-filter" type="text">
    <div each={ route,index in getRouteDetails()}>
        <div class={route: true, deprecated: route.deprecated}>
            <img class="route-status {route.aalekh.status}" src="{ getStatusIconPath(route.aalekh.status) }" width="16px">
            <button class="method {route.when} btn btn-sm">{route.when}</button>
            <span onclick="loadDetail({index})">{route.uri}</span>
        </div>
    </div>
    <script>
        this.on('mount', function(){
            $(".route").mouseover(function(){
                $(this).attr("font-size", "medium");
            })

            $(".route").mouseout(function(){
                $(this).attr("font-size", "small");
            })

            $("#route-filter").keyup(function(){
                if($("#route-filter").val() === ""){
                    $(".route").show();
                    return;
                }
                $(".route").hide();
                $(".route").each( function(){
                    if( $(this).html().toLowerCase().indexOf( $("#route-filter").val() ) > -1 ){
                        $(this).show();
                    }
                });
            });
        });
    </script>
</routelist>