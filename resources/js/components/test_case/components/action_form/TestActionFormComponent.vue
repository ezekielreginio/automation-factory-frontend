<template>
    <div class="card p-5 form-container overflow-hidden row">
        <Transition :name="slideDirection">
            <component :is="currentFormComponent"/>
        </Transition>
    </div>
</template>

<script>
    import TestActionsListComponent from './TestActionsListComponent.vue';
    import TestActionDetailsComponent from './TestActionDetailsComponent.vue'
    import { mapState } from 'vuex'

    export default {
        components: {
            TestActionsListComponent,
            TestActionDetailsComponent
        },
        computed: {
            ...mapState({
                currentFormComponent: state => state.testCaseForm.currentComponent
            }),
            slideDirection() {
                return this.currentFormComponent == 'test-action-details-component' ? 'slide-left' : 'slide-right'
            }
        }
    }
</script>

<style scoped>
/* Slide Animation */
.slide-left-enter-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 1s;
  width: 100%;
  max-height: 400px;
}

/* Slide Left Animation */
.slide-left-enter-from {
    transform: translate(0, 0);
}
.slide-left-leave-to {
  transform: translate(-120%, 0);
}
.slide-left-enter-to {
    transform: translate(-100%, 0);
}

/* Slide Right Animation */
.slide-right-enter-from {
    transform: translate(-200%, 0);
}
.slide-right-leave-to {
  transform: translate(115%, 0);
}
.slide-right-enter-to {
    transform: translate(-100%, 0);
}
.form-container {
    height: 90%;
    width: 90%;
}

</style>