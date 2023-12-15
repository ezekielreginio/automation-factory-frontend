<template>
    <div>
        <h1 class="font-size-28"><i @click="back()" class="fas fa-arrow-left pr-2 cursor-pointer"></i> Action Details</h1>
        <draggable :list="actions" 
            item-key="index"
            v-bind="dragOptions"
            class="actions-container mb-2">
            <template #item="{ element: action, index }">
                <component :is="buildActionComponent(action)" class="px-3" :index="index"/>
            </template>
        </draggable>
        <div class="d-flex flex-row-reverse mt-5">
            <button @click="save()" type="button" class="btn btn-md btn-success m-0 w-25 float-right">Proceed</button>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import TestActionService from '../../services/TestActionService';
    import draggable from "vuedraggable";

    export default {
        components: {
            draggable
        },
        data() {
            return {
                container: [],
                dragOptions: {
                    animation: 200,
                    disabled: false,
                }
            }
        },
        computed: {
            actions: {
                get() {
                    return this.$store.getters['testCaseForm/getActions']
                },
                set(newVal) {
                    this.setActions(newVal)
                }
            }
        },
        unmounted() {
            this.emitter.all.clear()
        },
        methods: {
            ...mapActions({
                showActionListComponent: 'testCaseForm/setCurrentComponent',
                resetActions: 'testCaseForm/resetActions',
                deselectActions: 'testCaseForm/deselectActions',
                setActions: 'testCaseForm/setActions'
            }),
            buildActionComponent(action) {
                return TestActionService.buildActionComponent(action, true)
            },
            save() {
                this.emitter.emit('saveActions')
                this.resetActions()
                this.deselectActions()
                this.showActionListComponent('test-actions-list-component')
            },
            back() {
                this.deselectActions()
                this.showActionListComponent('test-actions-list-component')
            }
        }
    }
</script>

<style scoped>
    .actions-container {
        height: 650px;
        overflow-y: auto;
    }
</style>