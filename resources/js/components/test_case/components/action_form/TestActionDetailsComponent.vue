<template>
    <div>
        <h1 class="font-size-28"><i @click="showActionListComponent('test-actions-list-component')" class="fas fa-arrow-left pr-2 cursor-pointer"></i> Action Details</h1>
        <div class="actions-container mb-2">
            <component v-for="(action, key) in actions" :is="buildActionComponent(action)" class="px-3" :action="action" :key="key"/>
        </div>
        <div class="d-flex flex-row-reverse mt-5">
            <button @click="save()" type="button" class="btn btn-md btn-success m-0 w-25 float-right">Proceed</button>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import TestActionService from '../../services/TestActionService';

    export default {
        data() {
            return {
                container: [],
            }
        },
        computed: {
            ...mapState({
                actions: state => state.testCaseForm.actions,
            }),
        },
        methods: {
            ...mapActions({
                showActionListComponent: 'testCaseForm/setCurrentComponent',
                resetActions: 'testCaseForm/resetActions',
                deselectActions: 'testCaseForm/deselectActions'
            }),
            buildActionComponent(action) {
                return TestActionService.buildActionComponent(action, true)
            },
            save() {
                this.emitter.emit('saveActions')
                this.resetActions()
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