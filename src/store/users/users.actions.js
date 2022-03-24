import database from "../../middleware/firebase/Database";

export default {
    createNewUser: async ({state}) => {
        // let userObj = {};
        // Object.assign(userObj, state.newUserGoogle)
        const newUser = await database.createUser({entity: state.newUserGoogle.entity, details: state.newUserGoogle});
        console.log(newUser, 'this new user sent to firebase DB')
    }
}