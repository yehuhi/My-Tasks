import firebaseInstance from '../'

export default {
    generateId,
    get,
    createUser,
    updateUserItem,
    updateUser,
    update,
    remove,
    getRef
}

firebaseInstance.firebase.database().ref(`users`)
    .on('child_changed', (snapshot) => {
        console.log(snapshot)
    });

function generateId(options) {
    // debugger
    return firebaseInstance.firebase.database().ref(options.entity).push()
        .then(res => {
            console.log(res.key)
            return res.key
        })
}

function get(options) {
    // eslint-disable-next-line no-debugger
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}`).once(`value`)
        .then(res => {
            // eslint-disable-next-line no-debugger
            debugger
            // המרה ל - firebase
            const arr = [];
            const map = res.val();
            for (const Key in map) {
                const item = map[Key];
                item.id = Key;
                arr.push(item);
            }
            return arr;
        })
}

function createUser(options) {
    // eslint-disable-next-line no-debugger
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${window.user.uid}`).update(options.details);
}

function updateUserItem(options) {
    // eslint-disable-next-line no-debugger
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${window.user.uid}/${options.subEntity}`).update(options.item);
}

function updateUser(options) {
    // eslint-disable-next-line no-debugger
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entiti}/${window.user.uid}/${options.subEntity}`).update(options.itemx);
}

function update(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).set(options.item)
        .then(() => {
            // debugger
            console.log(options.item);
        });
}

function remove(options) {
    // eslint-disable-next-line no-debugger
    debugger
    return firebaseInstance.firebase.database().ref(`${options.entity}/${options.id}`).remove()
}

function getRef(options) {
    return firebaseInstance.firebase.database().ref(`${options.entity}`)
}