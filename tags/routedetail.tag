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
        <select class="form-control form-control-sm" id="select-scenarios">
            <option selected={ index === 1} each={ scenario, index in this.opts.route.aalekh.scenarios } value= "{ index }">{ scenario.description }</option>
        </select>
    </div>
</routedetail>