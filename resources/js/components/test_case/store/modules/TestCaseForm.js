export const state = {
    currentComponent: 'test-actions-list-component',
    actionsList: [
        {
            title: "Go to URL",
            type: "url",
            description: "Redirect to a specified URL Route.",
            isSelected: false, 
            value: null
        },
        {
            title: "Click Button Action",
            type: "button",
            description: "Clicks a button with the specified identifier.",
            isSelected: false,
            value: null,
            identifier_type: null,
            key: null,
        },
        {
            title: "Fill a Field",
            type: "field",
            description: "Fills up a field with the specified identifier.",
            isSelected: false
        },
        {
            title: "Take a Screenshot",
            type: "screenshot",
            description: "Captures the current browser frame.",
            isSelected: false
        }
    ],
    actions: []
}

export const mutations = {
    SET_CURRENT_COMPONENT(state, currentComponent) {
        state.currentComponent = currentComponent
    },
    SET_ACTIONS(state, actions) {
        state.actions = actions
    },
    SET_ACTIONS_LIST(state, actionsList) {
        state.actionsList = actionsList
    },
    PUSH_ACTION(state, action) {
        state.actions.push(action)
    },
    SAVE_ACTION(state, {action, index}) {
        state.actions[index] = action
    }
}

export const actions = {
    setCurrentComponent({ commit }, component) {
        commit("SET_CURRENT_COMPONENT", component)
    },
    setActions({ commit }, actions) {
        commit("SET_ACTIONS", actions)
    },
    resetActions({ commit }) {
        commit("SET_ACTIONS", [])
    },
    pushAction({ commit }, action) {
        commit('PUSH_ACTION', action)
    },
    saveAction({commit}, {action, index}) {
        commit("SAVE_ACTION", {
            action: action, 
            index: index
        })
    },
    deselectActions({ commit, state }) {
        const deselectList = state.actionsList.map(obj => {
            if (obj.isSelected) {
                return { ...obj, isSelected: false };
            }
            return obj;
        });

        commit("SET_ACTIONS_LIST", deselectList)
    }
}

export const getters = {
    getSelectedActions: state => {
        return state.actionsList.filter(action => {
            return action.isSelected
        })
    },
    getActions: state => {
        return state.actions
    }
}