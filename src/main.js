import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {initializeApp} from "firebase/app";
import './quasar'
import 'chart.js'
import 'hchs-vue-charts'
import firebace from './middleware/firebase'
// import * as firebase from "@firebase/app";
// import 'firebase/auth';

Vue.use(window.VueCharts);

// const firebaseConfig = {
//     apiKey: "AIzaSyBx-CU6hrpI9JZWvgkGBhmtu8Fq5AHJOYI",
//     authDomain: "tok-tokapp.firebaseapp.com",
//     projectId: "tok-tokapp",
//     storageBucket: "tok-tokapp.appspot.com",
//     messagingSenderId: "426483539736",
//     appId: "1:426483539736:web:bb87c25db45a74aa18086d"
// };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// Vue.config.productionTip = false
// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount('#app')

firebace.auth.onAuthStateChanged((user) => {
    window.user = user;
    new Vue({
        router,
        store,
        // icon,
        render: h => h(App)
    }).$mount('#app')
});

// export default {
//     firebase
// }


