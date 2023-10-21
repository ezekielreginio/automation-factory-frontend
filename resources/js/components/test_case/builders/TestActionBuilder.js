import TestActionComponent from '../components/TestActionComponent.vue'
import {h} from 'vue';

export default class TestActionBuilder {
    constructor(action) {
        this.props = {}
        this.action = action
        this.props.title = this.#parseActionField('title')
        this.props.actionType = this.#parseActionField('type')
        this.props.value = this.#parseActionField('value')
        this.props.keyValue = this.#parseActionField('key')
        this.props.identifierType = this.#parseActionField('identifier_type')
    }

    isEditable(canEdit = false) {
        this.props.isEditable = canEdit
        return this
    }

    showValue(value = true) {
        this.props.showValue = value
        return this
    }

    showIdentifierType(value = true) {
        this.props.showIdentifierType = value
        return this
    }

    showKey(value = true) {
        this.props.showKey = value
        return this
    }

    build() {
        const props = this.props

        return {
            render: () => {
                return h(TestActionComponent, props)
            }
        }
    }

    getObject() {
        return this.props
    }

    #parseActionField(fieldName) {
        if(this.action[fieldName]) {
            return this.action[fieldName]
        }
        return null
    }
}