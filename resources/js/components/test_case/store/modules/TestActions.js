export const state = {
    actions: []
}

export const mutations = {
    PUSH_ACTION(state, action) {
        state.actions.push(action)
    }
}

export const actions = {
    pushAction({ commit }, action) {
        commit("PUSH_ACTION", action)
    },
}

export const getters = {
    getActions: state => {
        return state.actions
    }
}