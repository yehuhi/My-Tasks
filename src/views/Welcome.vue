<template>
  <q-layout view="hHh LpR fff" style="background: #140A26; display: flex; flex-direction: column; align-items: center">
    <div class="backG" style="max-width: 570px">
      <div class="rectangle">
        <p class="text-welcome">Hi there! Welcome to</p>
        <p class="text-app-name">My Tasks</p>
        <p class="text-description">Very simple Things To-Do List. Helps you to manage your daily life,
          without any hassle!
        </p>
      </div>

      <div class="group-ovals">
        <span class="oval-1"></span>
        <span class="oval-2"></span>
        <span class="oval-3"></span>
      </div>

      <div class="accounts" @click="singInFacebook">
        <div class="mask-fb-btn">
          <div class="facebook-mask"></div>
          <div class="facebook-text">FACEBOOK</div>
          <div class="logo-fb">f</div>
        </div>

        <div class="mask-go-btn" @click="singInGoogle">
          <div class="google-text">
            <span id="g-color">G</span>
            <span id="o-color">O</span>
            <span id="o2-color">O</span>
            <span id="g2-color">G</span>
            <span id="l-color">L</span>
            <span id="e-color">E</span>
          </div>
        </div>
      </div>
      <div class="skip">
      </div>
    </div>
    <div>
      <q-dialog v-model="welcomeToApp">
        <q-card style="width: 300px; height: 250px">
          <!--          <div style="width: 15px; height: 15px; border-radius: 50%; background-color: orange;-->
          <!--                margin: 20px 0 0 40px"></div>-->
          <!--          <p style="font-size: 18px; font-weight: bold; font-family: Comic Sans MS; margin: -23px 0 0 65px; ">-->
          <!--            {{ taskDialog }}</p>-->
          <!--          <div>-->
          <!--            <q-icon name="event" style="color:black; font-size: 28px; margin: 30px 0 0 40px"></q-icon>-->
          <!--          </div>-->
          <!--          <p style="color: #5B3E96; font-size: 12px; font-family: Comic Sans MS; margin: -23px 0 0 110px ">-->
          <!--            {{ taskDateDialog }}</p>-->
          <!--          <div style="width: 5px; height: 5px; border-radius: 50%; background-color: black;-->
          <!--                margin: -12px 0 0 151px"></div>-->
          <!--          <p style="color: #5B3E96; font-size: 12px; font-family: Comic Sans MS; margin: -12px 0 0 167px ">-->
          <!--            {{ taskHourDialog }}</p>-->
          <p style="font-size: 13px; font-weight: bold; font-family: Comic Sans MS;
           width: 300px; padding: 25px 40px 0 40px; ">
            {{ welcomeText }}</p>
          <q-btn
              style="width: 100% ;height: 45px; background-color: #ec4444; color: white; top: 82%; position: absolute"
              v-close-popup label="close">
            Delete
          </q-btn>
        </q-card>
      </q-dialog>
    </div>
  </q-layout>
</template>

<script>
import firebaseI from '../middleware/firebase'
import {mapMutations} from "vuex";
import {mapActions} from "vuex";


export default {
  name: "Welcome",
  data() {
    return {
      welcomeToApp: false,
      welcomeText: 'Welcome To TOK TOK TASKS',
      privateUser: {
        userName: '',
        email: '',
        url: '',
        imPrivate: '',
        entity: 'users',
      },
    }
  },
  methods: {
    ...mapMutations('users', ['newUserG']),
    ...mapActions('users', ['createNewUser']),
    goToHomeScreen() {
      this.$router.push('/calendar-month');
    },
    singInGoogle() {
      // this.alert = true;
      // eslint-disable-next-line no-debugger
      debugger
      // const provider = firebace.auth.signInWithPopup()GoogleAuthProvider();
      let providero = firebaseI.provider;
      console.log(providero)

      firebaseI.signInWithPopup(firebaseI.auth, providero)
          .then(async (result) => {
            /** @type {firebase.auth.AuthCredential} */
                // let credential = result.credential;
            const credential = firebaseI.GoogleAuthProvider.credentialFromResult(result);
            console.log(credential, 'CREDENTIAL')
            console.log('IS NEW USER ? ==>  ', result._tokenResponse)
            let token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // eslint-disable-next-line no-debugger
            debugger
            // console.log(`if new user in the DB = ${result.additionalUserInfo.isNewUser}`)
            if (result._tokenResponse.isNewUser) {
              debugger
              this.privateUser = {
                userName: result._tokenResponse.fullName,
                email: result._tokenResponse.email,
                url: result._tokenResponse.photoUrl,
                imPrivate: true,
                entity: 'users',
              };
              // eslint-disable-next-line no-debugger
              debugger
              this.newUserG(this.privateUser);
              await this.createNewUser().then(() => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = credential.accessToken;
                console.log(token);
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                window.user = result.user;
                this.$router.push('/calendar-month');
                this.$q.notify('WELCOME');
              })
            } else {
              await this.$router.push('/calendar-month');
              this.$q.notify('WELCOME');
              // this.welcomeToApp = true;
            }
          }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.email;
        console.log(email);
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log(credential);

        // ...
      });
    },

    singInFacebook() {
      if (!window.user) {
        this.$q.notify('Not currently active')
      }
    }
  }
}
</script>

<style scoped>

* {
  padding: 0;
  margin: 0;
  height: auto;
  box-sizing: border-box;
}


html {
  font-size: 62.5%; /* 1rem = 10px*/

}

.rectangle {
  position: absolute;
  display: flex;
  width: 100%;
  height: 250px;
  flex-direction: column;
  align-items: center;
  border-radius: 0 0 400% 400% / 50% 50% 70% 70%;
  background: #221738;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.text-welcome {
  position: absolute;
  top: 100px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 16px;
  color: #FFFFFF;
}

.text-app-name {
  position: absolute;
  top: 150px;
  color: #cccccc;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-weight: bold;
  font-size: 40px;
  width: 300px;
  mix-blend-mode: normal;
  letter-spacing: 1.9px;
}

.text-description {
  position: absolute;
  top: 50vh;
  width: 300px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 19px;
  /*line-height: 23px;*/
  /* or 164% */
  display: flex;
  align-items: center;
  color: #ADADAD;
}

.backG {
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #140A26;
}

.oval-1 {
  position: absolute;
  left: 20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(131, 136, 151, 0.590438);
  border: 1px solid rgba(131, 136, 151, 0.590438);
}

.oval-2 {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid rgba(131, 136, 151, 0.590438);
}

.oval-3 {
  position: absolute;
  right: 20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid rgba(131, 136, 151, 0.590438);
}

.group-ovals {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 63vh;
  width: 100px;
  height: 50px;
  /*border: 1px solid #5B3E96;*/
}

.accounts {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 40px;
  right: 40px;
  top: 83vh;
}

.facebook-mask {
  position: absolute;
  left: 0%;
  right: 10.43%;
  top: 0%;
  bottom: 15.25%;
  height: 50px;
  width: 40px;
  background: #25417e;
  box-shadow: 0px 4px 8px rgba(59, 87, 152, 0.115149), 0 8px 16px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  /*border: 3px solid #FFFFFF;*/
}

.facebook-text {
  position: absolute;
  left: 29.04%;
  right: 48.66%;
  top: 38.94%;
  bottom: 27.46%;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 13px;
  /* identical to box height */
  letter-spacing: 1.9px;
  color: #FFFFFF;
}

.logo-fb {
  position: absolute;
  left: -20%;
  right: 91.7%;
  top: 5.69%;
  width: 50%;
  color: #FFFFFF;
  font-size: 30px;
  font-weight: 900;
  bottom: 27.34%;
}

.mask-fb-btn {
  position: absolute;
  left: 13.11%;
  right: 10.43%;
  top: 10px;
  bottom: 25.25%;
  height: 50px;
  background: #3B5798;
  box-shadow: 0px 4px 8px rgba(59, 87, 152, 0.115149), 0px 8px 16px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
}

.mask-go-btn {
  position: absolute;
  left: 13.11%;
  right: 10.43%;
  /*top: 56.6%;*/
  bottom: 17.24%;
  height: 50px;
  background: #afafaf;
  box-shadow: 0px 4px 8px rgba(80, 199, 227, 0.130293), 0px 8px 16px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
}

.mask-go-btn:hover {
  background: #a2a1a1;
  box-shadow: 2px 2px rgba(140, 132, 159, 0.38);
}

/*.logo-go {*/
/*  position: absolute;*/
/*  left: 4.57%;*/
/*  right: 91.7%;*/
/*  top: 3.69%;*/
/*  width: 50%;*/
/*  color: blue;*/
/*  font-size: 25px;*/
/*  font-weight: 900;*/
/*  bottom: 27.34%;*/
/*}*/

.google-text {
  position: absolute;
  left: 33.04%;
  right: 48.66%;
  top: 34.94%;
  bottom: 27.46%;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: 900;
  letter-spacing: 1.9px;
  font-size: 22px;
  line-height: 13px;
  /* identical to box height */
}

/*.google-mask {*/
/*  position: absolute;*/
/*  left: 0%;*/
/*  right: 10.43%;*/
/*  top: 0%;*/
/*  bottom: 25.25%;*/
/*  height: 40px;*/
/*  width: 40px;*/
/*  background: #d0d0d0;*/
/*  box-shadow: 0px 4px 8px rgba(60, 89, 155, 0.11), 0 8px 16px rgba(0, 0, 0, 0.04);*/
/*  border-radius: 3px;*/
/*  !*border: 3px solid #FFFFFF;*!*/
/*}*/

#g-color {
  color: blue;
}

#o-color {
  color: red;
}

#o2-color {
  color: yellow;
}

#g2-color {
  color: blue;
}

#l-color {
  color: green;
}

#e-color {
  color: red;
}

/*.skip {*/
/*  position: absolute;*/
/*  left: 45%;*/
/*  right: 45%;*/
/*  top: 85vh;*/
/*  bottom: 11.7%;*/
/*  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;*/
/*  font-style: normal;*/
/*  font-weight: bold;*/
/*  font-size: 15px;*/
/*  line-height: 13px;*/
/*  !* identical to box height *!*/
/*  letter-spacing: 1.5px;*/
/*  color: #E6E6E6;*/
/*}*/


@media only screen and (min-width: 360px) and (max-width: 450px) {
  .logo-fb {
    left: -17.5%;
  }

  .text-description {
    top: 40vh;
    font-size: 18px;
    width: 280px;
  }

  .group-ovals {
    top: 50vh;
  }

  .accounts {
    left: 40px;
    right: 40px;
    top: 75vh;
  }

}

/*@media only screen and (min-width: 280px) and (max-width: 340px) {*/

/*  .text-description {*/
/*    top: 45vh;*/
/*    font-size: 16px;*/
/*    width: 250px;*/
/*  }*/

/*  .group-ovals {*/
/*    top: 58vh;*/
/*  }*/

/*  .accounts {*/
/*    top: 80vh;*/
/*  }*/

/*  .facebook-text {*/
/*    font-size: 18px;*/
/*  }*/

/*  .logo-fb {*/
/*    left: -15%;*/
/*    font-size: 30px;*/
/*  }*/

/*  .google-text {*/
/*    left: 24.04%;*/
/*  }*/
/*}*/


</style>
