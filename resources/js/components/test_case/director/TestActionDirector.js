export default class TestActionDirector {
    constructor(builder) {
        this.builder = builder
    }

    makeUrlAction() {
        return this.builder
            .showValue()
            .build()   
    }

    makeButtonAction() {
        return this.builder
            .showIdentifierType()
            .showKey()
            .build()
    }
}