<template>
    <div class="row mb-3 w-100 px-4">
        <div class="card col-12 m-0 p-0">
            <div class="card-header dark-green-bg text-white">
                {{ actionTitle[actionType] }}
            </div>
            <div class="card-body row">
                <div v-if="showIdentifierType" class="col">
                    <span class="font-weight-bold">Identifier Type: </span> {{ identifierType }}
                </div>
                <div v-if="showKey" class="col">
                    <span class="font-weight-bold">Key: </span> {{ keyValue }}
                </div>
                <div v-if="showValue" class="col">
                    <span class="font-weight-bold">{{ fetchValueLabel() }}: </span> {{ value }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                actionTitle : {
                    'url': 'Go to URL',
                    'button': 'Click Button Action',
                },
                valueLabel : {
                    'url': 'Route'
                } 
            }
        },
        props: {
            actionType: {
                type: String,
                required: true
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
            },
        },
        methods: {
            fetchValueLabel() {
                switch(this.actionType) {
                    case 'url':
                        return 'Route'
                        break;
                    default:
                        return 'Value'
                }
            }
        }
    }
</script>