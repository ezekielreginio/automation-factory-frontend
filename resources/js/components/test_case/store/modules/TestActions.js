export const state = {
    actions: [],
    currentRightComponent: 'automation-quote-component'
}

export const mutations = {
    PUSH_ACTION(state, {action, index}) {
        state.actions[index] = action
    },
    SET_ACTIONS(state, actions) {
        state.actions = actions
    },
    SET_RIGHT_COMPONENT(state, currentRightComponent) {
        state.currentRightComponent = currentRightComponent
    }
}

export const actions = {
    pushAction({ commit }, {action, index}) {
        commit("PUSH_ACTION", {
            action: action, 
            index: index
        })
    },
    setActions({ commit }, actions) {
        commit('SET_ACTIONS', actions)
    },
    setRightComponent({ commit }, currentRightComponent) {
        commit('SET_RIGHT_COMPONENT', currentRightComponent)
    }
}

export const getters = {
    getActions: state => {
        return state.actions
    },
    getRightComponent: state => {
        return state.currentRightComponent
    }
}