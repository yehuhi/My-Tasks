import database from "../../middleware/firebase/Database";

export default {
    createNewUser: async ({state}) => {
        debugger
        // let userObj = {};
        // Object.assign(userObj, state.newUserGoogle)
        const newUser = await database.createUser(state.newUserGoogle);
        console.log(newUser, 'this new user sent to firebase DB')
    }
}
