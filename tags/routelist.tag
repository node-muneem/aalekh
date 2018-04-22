<routelist>
    <div each={ route,index in getRouteDetails()}>
        <div class={route: true, deprecated: route.deprecated}>
            <img class="route-status" src="{ getStatusIconPath(route.aalekh.status) }" width="16px">
            <button class="method {route.when} btn btn-sm">{route.when}</button>
            <span onclick="loadDetail({index})">{route.uri}</span>
        </div>
    </div>
</routelist>