import firebaseInstance from '../index'

export default {
    generateId,
    getUserTasks,
    createUser,
    updateUserTaskByID,
    createUserTask,
    remove,
}

// firebaseInstance.firebase.database().ref(`users`)
//     .on('child_changed', (snapshot) => {
//         console.log(snapshot)
//     });

function generateId(options) {
    // debugger
    return firebaseInstance.DB.ref(options.entity).push()
        .then(res => {
            console.log(res.key)
            return res.key
        })
}

function getUserTasks() {
    debugger
    let postElement = {};
    let arrTask = [];
    return firebaseInstance.get(firebaseInstance.child(firebaseInstance.dbRef, '/users/' + window.user.uid + '/tasks/')).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            let data = snapshot.val();
            Object.assign(postElement, data);
            debugger
            for (const key in postElement) {
                const objTask = {};
                objTask.task = postElement[key].task
                objTask.date = postElement[key].date
                objTask.hour = postElement[key].hour
                objTask.description = postElement[key].description
                objTask.id = key
                arrTask.push(objTask);
            }
            return arrTask;
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function createUser(details) {
    debugger
    return firebaseInstance.set(firebaseInstance.ref(firebaseInstance.DB, 'users/' + window.user.uid),
        {details});
}


function createUserTask(data) {
    debugger
    // Get a key for a new Post.
    const newPostKey = firebaseInstance.push(firebaseInstance.child(firebaseInstance.ref(firebaseInstance.DB), 'tasks')).key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    // updates['/task/' + newPostKey] = data;
    updates['/users/' + window.user.uid + '/tasks/' + newPostKey] = data;
    return firebaseInstance.update(firebaseInstance.ref(firebaseInstance.DB), updates);
}

function updateUserTaskByID(data, taskID) {
    debugger
    const updates = {};
    updates['/users/' + window.user.uid + '/tasks/' + taskID] = data;
    return firebaseInstance.update(firebaseInstance.ref(firebaseInstance.DB), updates);
}

//
// function remove(data, taskID) {
//     debugger
//     // Get a key for a new Post.
//     // const newPostKey = firebaseInstance.push(firebaseInstance.child(firebaseInstance.ref(firebaseInstance.DB), 'tasks')).key;
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     // updates['/task/' + newPostKey] = data;
//     // updates['/users/' + window.user.uid + '/tasks/' + taskID];
//     return firebaseInstance.remove(firebaseInstance.ref(firebaseInstance.DB), ['/users/' + window.user.uid + '/tasks/' + taskID]);
// }


function remove(taskID) {
    debugger
    firebaseInstance.remove(firebaseInstance.ref(firebaseInstance.DB, '/users/' + window.user.uid + '/tasks/' + taskID))
        .then(res => {
            console.log(res, 'Deleted from DB')
        });
}

