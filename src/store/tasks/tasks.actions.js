import database from "../../middleware/firebase/Database";


export default {
    newTask: ({commit}) => { // rootState, dispatch, state
        let task = {};

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
        debugger
        commit('newTasks', task);
    },

    newUserTasK: ({state}) => {
        debugger
        let data = state.newTaskAdd;
        let newData = database.createUserTask(data);
    },

    get_user_tasks: async ({state, commit}) => {
        debugger
        const tasks = await database.getUserTasks();
        debugger
        return tasks;
    },

    updateTask: ({state, commit}) => {
        let id = state.editTaskAdd.taskID;
        debugger
        database.updateUserTaskByID(state.editTaskAdd, id)
            .then(res => console.log('update task'));
    },

    removeTasks: ({state}) => {
        debugger
        let id = state.removeTask.id;
        database.remove(id)
        debugger
    }

}
