export default {
    setUsers: ((state, users) => state.privateUsers = users),

    newUserG: ((state, user) => {
        debugger
        state.newUserGoogle = user
    }),




}
