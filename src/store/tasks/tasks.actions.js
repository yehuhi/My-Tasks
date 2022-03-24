import database from "../../middleware/firebase/Database";


export default {
    newTask: ({commit}) => { // rootState, dispatch, state
        let task = {};

        // eslint-disable-next-line no-debugger
        debugger
        database.generateId({entity: 'Test'})
            .then(() => {
                task = {
                    topic: '',
                    description: '',
                    hour: '',
                    date: ''
                }
            });
        // eslint-disable-next-line no-debugger
        debugger
        commit('newTasks', task);
    },
}
