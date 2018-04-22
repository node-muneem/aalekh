<routedetail>
    <div id="status-icon">
        <img src="{ getStatusIconPath( opts.route.aalekh.status) }" width="30px">
    </div>
    <div class="url">
        <button class="{ opts.route.when } btn btn-md">{ opts.route.when }</button>
        <span each={urlPart,index in opts.route.uri.split('/') }>
            <span if= {index > 0} class={ url-param: urlPart.startsWith(":") }>/{ urlPart }</span>
        </span>
    </div>
    <br>
    <p>Description</p>
    <p>{ opts.route.aalekh.description }</p>
    <div class="form-group">
        <select class="form-control form-control-sm" id="select-scenarios" onchange={check}>
            <option selected="true" disabled="true">Select a scenario</option>
            <option each={ scenario, index in opts.route.aalekh.scenarios } value= "{ index }" >{ scenario.description }</option>
        </select>
    </div>

    <script>
        check(e){
            riot.mount("scenario", { scenario : opts.route.aalekh.scenarios[e.target.value] })
        }
    </script>
</routedetail>