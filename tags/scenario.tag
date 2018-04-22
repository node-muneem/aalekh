<scenario >
    <div class="rr">
        <div>Content Type: {opts.scenario.type}</div>
        <div>Status Code: {opts.scenario.response.status}</div>
        <table>
            <thead>
                <tr>
                    <td>Request</td>
                    <td>Response</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                        <td>Headers</td>
                        <td></td>
                </tr>
                <tr>
                        <td><pre id="req-headers">{ opts.scenario.request.headers }</pre><br></td>
                        <td><pre id="req-headers">{ opts.scenario.response.headers }</pre><br></td>
                </tr>
                <tr>
                        <td>Payload</td>
                        <td></td>
                </tr>
                <tr>
                        <td><pre id="req-payload">{ opts.scenario.request.payload }</pre><br></td>
                        <td><pre id="req-payload">{ opts.scenario.response.payload }</pre><br></td>
                </tr>
            </tbody>
        </table>
    </div>
</scenario>