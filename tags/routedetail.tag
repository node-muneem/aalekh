<routedetail>
    <div id="status-icon">
        <img src="{ getStatusIconPath( this.opts.route.aalekh.status) }" width="30px">
    </div>
    <div class="url">
        <button class="{ this.opts.route.when } btn btn-md">{ this.opts.route.when }</button>
        <span each={urlPart,index in this.opts.route.uri.split('/') }>
            <span if= {index > 0} class={ url-param: urlPart.startsWith(":") }>/{ urlPart }</span>
        </span>
    </div>
    <br>
    <p>Description</p>
    <p>{ this.opts.route.aalekh.description }</p>

    <div class="form-group">
        <select class="form-control form-control-sm" id="scenarios">
            <option selected="true" each={ option in this.opts.route.aalekh.scenarios } value= "{ option }">{ option }</option>
        </select>
    </div>
</routedetail>