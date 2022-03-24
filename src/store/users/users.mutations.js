export default {
    setUsers: ((state, users) => state.privateUsers = users),

    newUserG: ((state, user) => {
        // eslint-disable-next-line no-debugger
        debugger
        state.newUserGoogle = user
    }),


}