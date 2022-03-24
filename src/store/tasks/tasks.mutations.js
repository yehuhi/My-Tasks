export default {
    newTasks: ((state, task) => state.task = task),

    newTaskUser: ((state, task) => {
        debugger
        state.newTaskAdd = task
    }),

    editTaskUser: ((state, task) => {
        debugger
        state.editTaskAdd = task
    }),

    removeTaskUser: ((state, task) => {
        debugger
        state.removeTask = task
    }),

    user_Task: ((state, tasks) => {
        debugger
        state.userTasks = tasks
    }),
}
