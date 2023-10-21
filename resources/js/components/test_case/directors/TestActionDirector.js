export default class TestActionDirector {
    constructor(builder, isEditable = false) {
        this.builder = builder
        this.isEditable = isEditable
    }

    makeUrlAction() {
        return this.builder
            .showValue()
            .isEditable(this.isEditable)
            .build()   
    }

    makeButtonAction() {
        return this.builder
            .showIdentifierType()
            .showKey()
            .isEditable(this.isEditable)
            .build()
    }

    makeFieldAction() {
        return this.builder
            .showIdentifierType()
            .showKey()
            .showValue()
            .isEditable(this.isEditable)
            .build()
    }
}