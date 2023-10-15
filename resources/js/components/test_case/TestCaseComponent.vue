<template>
    <div class="container-fluid">
        <div class="row my-auto" style="height: 950px">
            <div class="col-6 bg-white card p-4 px-auto">
                <h1 class="light-green-text mb-5 font-weight-600 font-size-33">Create a Test Case</h1>
                <div class="row">
                    <div class="form-row mb-4 col-12">
                        <label for="test-case-name" class="col-2 pt-2 font-weight-bold">Test Case Name:</label>
                        <input type="email" class="form-control col-10" id="exampleInputEmail1"
                            placeholder="Enter name">
                    </div>
                    <div class="form-row mb-4 col-6">
                        <label for="browser" class="col-3 pt-2 font-weight-bold">Browser:</label>
                        <div class="col-9 p-0"><select name="browser" placeholder="Select driver" class="form-control">
                                <option value="">Select driver</option>
                                <option value="chrome">Chrome</option>
                                <option value="edge">Edge</option>
                                <option value="firefox" disabled>Firefox</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row mb-4 col-6">
                        <label for="test-type" class="col-3 pt-2 font-weight-bold">Test type:</label>
                        <div class="col-9 p-0"><select name="test-type" placeholder="Select type" class="form-control">
                                <option value="">Select type</option>
                                <option value="web">Web</option>
                                <option value="api" disabled>API</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row mb-4 col-6">
                        <label for="instance" class="col-3 pt-2 font-weight-bold">Instance:</label>
                        <div class="col-9 p-0"><select name="instance" placeholder="Select instance"
                                class="form-control">
                                <option value="">Select instance</option>
                                <option value="dev">DEV</option>
                                <option value="qa">QA</option>
                                <option value="prod" disabled>PROD</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row mb-4 col-6">
                        <label for="platform" class="col-3 pt-2 font-weight-bold">Platform:</label>
                        <div class="col-9 p-0"><select name="platform" placeholder="Select platform"
                                class="form-control">
                                <option value="">Select platform</option>
                                <option value="core">Core</option>
                                <option value="shipit">ShipIt</option>
                                <option value="trade">Trade</option>
                                <option value="supplier">Supplier</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h2 class="font-weight-bold font-size-16">List of Actions:</h2>
                <div class="actions-container mb-2">
                    <component v-for="action in actions" :is="buildActionComponent(action)"></component>
                </div>
                <div class="d-flex justify-content-center pl-2 pr-4 w-100"><button type="submit" class="btn btn-block btn-primary m-0 mr-3">Add Action</button></div>
            </div>
            <div class="col-6 dark-green-bg">
                <iframe src="http://raftpiea.tech:8080/reports/ExtentReports.html" title="Iframe Example" class="w-100 h-100"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    import TestActionBuilder from './components/TestActionBuilder.js';
    import TestActionDirector from './director/TestActionDirector.js';

    export default {
        data() {
            return {
                actions: [
                    {
                        "type": "url",
                        "value": "/login",
                        "take_screenshot": true
                    },
                    {
                        "type": "button",
                        "identifier_type": "aria-label",
                        "key": "Accept all cookies",
                        "wait_time": 3,
                        "take_screenshot": true
                    },
                ]
            }
        }, 
        methods: {
            buildActionComponent(action) {
                let builder = new TestActionBuilder(action)
                let director = new TestActionDirector(builder)
                switch(action.type) {
                    case 'button': 
                        return director.makeButtonAction();
                    case 'url':
                        return director.makeUrlAction();
                    default:
                        return director.makeUrlAction();
                }
            }
        }
    }
</script>

<style scoped>
    .actions-container {
        max-height: 500px;
        overflow-y: scroll;
    }
</style>