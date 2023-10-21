<template>
    <div>
        <h1 class="font-size-28">Select Action/s</h1>
        <div class="action-form-container w-100">
            <div v-for="(action, key) in actionsList" @click="selectAction(action, key)" 
                class="p-3 green-border-left my-2 row mx-2"
                :class="{ 'action-card': !action.isSelected, 'light-green-bg text-white': action.isSelected }">
                <div class="col-10">
                    <p class="font-weight-bold m-0 p-0">{{ action.title }}</p>
                    <p class="m-0 p-0 font-size-12">{{ action.description }}</p>
                </div>
                <i v-if="action.isSelected" class="far fa-check-circle fa-lg col-2 my-auto text-right"></i>
                <i v-else class="far fa-circle fa-lg col-2 my-auto text-right"></i>
            </div>
        </div>
        <div v-if="hasSelected" class="d-flex flex-row-reverse mt-5">
            <button @click="nextPage()" type="button" class="btn btn-md btn-success m-0 w-25 float-right">Proceed</button>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapState({
                actionsList: state => state.testCaseForm.actionsList,
                actions: state => state.testCaseForm.actions,
            }),
            ...mapGetters({
                selectedActions: 'testCaseForm/getSelectedActions'
            }),
            hasSelected() {
                return this.selectedActions.length > 0;
            }
        },
        methods: {
            ...mapActions({
                showActionDetailsComponent: 'testCaseForm/setCurrentComponent',
                setActions: 'testCaseForm/setActions'
            }),
            selectAction(action, key) {
                this.actionsList[key].isSelected = !this.actionsList[key].isSelected
            },
            nextPage() {
                this.showActionDetailsComponent('test-action-details-component')
                this.setActions(this.selectedActions)
            }
        }
    }
</script>

<style scoped>
    .action-card {
        background: linear-gradient(to left, white 50%, var(--light-green) 50%) right;
        background-size: 200%;
        -webkit-transition: .5s ease-out;
        -moz-transition: .5s ease-out;
        transition: .5s ease-out;
    }
    .action-card:hover {
        background-position: left;
        color: white;
    }
    .green-border-left {
        border-left: 10px solid var(--light-green)!important;
        border: 1px solid var(--gray);
        border-radius: 5px;
    }
    .action-form-container {
        height: 650px;
        overflow-y: auto;
    }
</style>