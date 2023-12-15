<template>
    <div class="container-fluid">
        <div class="row my-auto" style="height: 950px">
            <div class="col-6 bg-white card p-4 px-auto">
                <h1 class="light-green-text mb-5 font-weight-600 font-size-33">Create a Test Case</h1>
                <div class="row">
                    <div class="form-row mb-4 col-12">
                        <label for="test-case-name" class="col-2 pt-2 font-weight-bold">Test Case Name:</label>
                        <input type="text" v-model="formData.name" id="exampleInputEmail1"
                            placeholder="Enter name" class="form-control col-10">
                    </div>
                    <div class="form-row mb-4 col-6">
                        <label for="browser" class="col-3 pt-2 font-weight-bold">Browser:</label>
                        <div class="col-9 p-0">
                            <select v-model="formData.webDriver" name="browser" placeholder="Select driver" class="form-control">
                                <option value="" disabled selected>Select driver</option>
                                <option value="chrome">Chrome</option>
                                <option value="edge">Edge</option>
                                <option value="firefox" disabled>Firefox</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row mb-4 col-6">
                        <label for="test-type" class="col-3 pt-2 font-weight-bold">Test type:</label>
                        <div class="col-9 p-0"><select v-model="formData.testType" name="test-type" placeholder="Select type" class="form-control">
                                <option value="" disabled selected>Select type</option>
                                <option value="web">Web</option>
                                <option value="api" disabled>API</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row mb-4 col-6">
                        <label for="instance" class="col-3 pt-2 font-weight-bold">Instance:</label>
                        <div class="col-9 p-0"><select v-model="formData.instance" name="instance" placeholder="Select instance"
                                class="form-control">
                                <option value="" disabled selected>Select instance</option>
                                <option value="dev">DEV</option>
                                <option value="qa">QA</option>
                                <option value="prod" disabled>PROD</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row mb-4 col-6">
                        <label for="platform" class="col-3 pt-2 font-weight-bold">Platform:</label>
                        <div class="col-9 p-0"><select v-model="formData.platform" name="platform" placeholder="Select platform"
                                class="form-control">
                                <option value="" disabled selected>Select platform</option>
                                <option value="core">Core</option>
                                <option value="shipit_ph">ShipIt PH</option>
                                <option value="shipit_id">ShipIt ID</option>
                                <option value="trade">Trade</option>
                                <option value="supplier">Supplier</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h2 class="font-weight-bold font-size-16">List of Actions:</h2>
                <draggable :list="actions" class="actions-container mb-2" v-bind="dragOptions" item-key="key">
                    <template :key="action.type + index" #item="{ element: action, index }">
                        <component :is="buildActionComponent(action)" class="px-4" :index="index" />
                    </template>
                </draggable>
                <div class="d-flex justify-content-center pl-2 pr-4 w-100">
                    <button :disabled="rightComponent == 'test-action-form-component'" type="button" @click="rightComponent='test-action-form-component'" class="btn btn-block btn-primary m-0 mr-3">Add Action</button>
                </div>
                <div class="d-flex flex-row-reverse mt-auto">
                    <button type="button" @click="setRightComponent('socket-console-component')" class="btn btn-md btn-success m-0 w-25 float-right">Execute</button>
                </div>
            </div>
            <div class="col-6 dark-green-bg d-flex justify-content-center align-items-center overflow-hidden">
                <Transition name="fade" mode="out-in">
                    <component :is="rightComponent" @execute="execute"/>
                </Transition>
                <!-- <iframe src="http://raftpiea.tech:8080/reports/ExtentReports.html" title="Iframe Example" class="w-100 h-100"></iframe> -->
            </div>
        </div>
    </div>
</template>

<script>
    import TestActionService from '../services/TestActionService.js'
    import AutomationService from '../services/AutomationService.js'
    import { parseInstanceUrl } from '../../../helpers/InstanceUrlHelper.js'
    import TestActionFormComponent from './action_form/TestActionFormComponent.vue'
    import AutomationQuoteComponent from './action_form/AutomationQuoteComponent.vue'
    import SocketConsoleComponent from './action_output/SocketConsoleComponent.vue'
    import { mapGetters, mapActions } from 'vuex'
    import draggable from "vuedraggable"

    export default {
        components: {
            TestActionFormComponent,
            AutomationQuoteComponent,
            SocketConsoleComponent,
            draggable
        },
        data() {
            return {
                dragOptions: {
                    animation: 200,
                    disabled: false,
                },
                formData: {
                    name: null,
                    testType: "",
                    webDriver: "",
                    instance: "",
                    platform: ""
                },
                sessionId: null
            }
        },
        computed: {
            ...mapGetters({
                actions: 'testActions/getActions',
            }),
            slideDirection() {
                return this.rightComponent == 'automation-quote-component' ? 'slide-right' : 'slide-left'
            },
            actions: {
                get() {
                    return this.$store.getters['testActions/getActions']
                },
                set(newVal) {
                    this.setActions(newVal)
                }
            },  
            rightComponent: {
                get() {
                    return this.$store.getters['testActions/getRightComponent']
                },
                set(newVal) {
                    this.setRightComponent(newVal)
                }
            }
        },
        methods: {
            ...mapActions({
                setActions: 'testActions/setActions',
                setRightComponent: 'testActions/setRightComponent',
            }),
            buildActionComponent(action) {
                return TestActionService.buildActionComponent(action)
            },
            execute(sessionId = null) {
                this.sessionId = sessionId
                AutomationService.executeAutomation(this.preparePayload())
            },
            preparePayload() {
                return {
                    name: this.formData.name,
                    webDriver: this.formData.webDriver,
                    url: parseInstanceUrl(this.formData.instance, this.formData.platform),
                    generate_report: true,
                    actions: JSON.parse(JSON.stringify(this.actions)),
                    sessionId: this.sessionId
                }
            }
        }
    }
</script>

<style scoped>
    .actions-container {
        overflow-y: auto;
        max-height: 500px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>