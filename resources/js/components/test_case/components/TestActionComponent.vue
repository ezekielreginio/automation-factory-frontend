<template>
    <div class="row mb-3 w-100">
        <div class="card col-12 m-0 p-0">
            <div class="card-header dark-green-bg text-white">
                {{ title }}
            </div>
            <div class="card-body row">
                <div v-if="showIdentifierType" class="col d-flex">
                    <span class="font-weight-bold my-auto">Identifier Type: </span> 
                    <input v-if="isEditable" v-model="identifierType" type="text" class="form-control form-sm w-75 ml-3">
                    <span v-else class="ml-1 my-auto">{{ identifierType }}</span>
                </div>
                <div v-if="showKey" class="col d-flex">
                    <span class="font-weight-bold my-auto">Key: </span>
                    <input v-if="isEditable" v-model="keyValue" type="text" class="form-control form-sm w-75 ml-3">
                    <span v-else class="ml-1 my-auto">{{ keyValue }}</span>
                </div>
                <div v-if="showValue" class="d-flex flex-row" :class="[isEditable ? 'col-12 mt-2' : 'col']">
                    <span class="font-weight-bold my-auto mr-2">{{ fetchValueLabel() }}: </span>
                    <input v-if="isEditable" v-model="value" type="text" class="form-control form-sm w-75 ml-3 w-100 ml-5 mr-4">
                    <span v-else class="ml-1 my-auto">{{ value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { filterNullValues } from '../../../helpers/JsonHelper.js'
    import { mapActions } from 'vuex'

    export default {
        props: {
            actionType: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            isEditable: {
                type: Boolean,
                default: false
            },
            showValue: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                required: false
            },
            showKey: {
                type: Boolean,
                default: false
            },
            keyValue: {
                type: String,
                required: false
            },
            showIdentifierType: {
                type: Boolean,
                default: false
            },
            identifierType: {
                type: String,
                required: false
            }
        },
        data() {
            return {
                valueLabel : {
                    'url': 'Route'
                }
            }
        },
        created() {
            this.emitter.on('saveActions', this.onSave)
        },
        unmounted() {
            this.emitter.off('saveActions', this.onSave)
            this.emitter.all.clear()
        },
        methods: {
            ...mapActions({
                pushAction: 'testActions/pushAction',
            }),
            fetchValueLabel() {
                switch(this.actionType) {
                    case 'url':
                        return 'Route'
                    default:
                        return 'Value'
                }
            },
            onSave() {
                let actionData = {
                    title: this.title,
                    type: this.actionType,
                    value: this.value,
                    key: this.keyValue,
                    identifier_type: this.identifierType
                }

                /** Filters out the null key value pairs from action data */
                let model = filterNullValues(actionData);
                this.pushAction(model)
            }
        }
    }
</script>