import TestActionDirector from '../directors/TestActionDirector.js';
import TestActionBuilder from '../builders/TestActionBuilder.js';

export default class TestActionService {
    static buildActionComponent(action, isEdit = false) {
        let builder = new TestActionBuilder(action)
        let director = new TestActionDirector(builder, isEdit)

        switch(action.type) {
            case 'button': 
                return director.makeButtonAction();
            case 'url':
                return director.makeUrlAction();
            case 'field':
                return director.makeFieldAction();
            default:
                return director.makeUrlAction();
        }
    }

    static buildModel(action) {
        let builder = new TestActionBuilder(action)

        return JSON.parse(JSON.stringify(builder.getObject()))
    }
}