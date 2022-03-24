<template>
  <!--  <q-layout view="hHh LpR fff" style="background: #140A26; display: flex; flex-direction: column; align-items: center">-->
  <!--    <div class="bgP" style="max-width: 570px">-->
  <div class="bgP">
    <div class="first-circle-pic">
      <q-btn @click="singOut" flat class="logOut-btn"> Log Out
      </q-btn>
    </div>
    <div class="second-circle-pic">
    </div>

    <q-img :src="userPhoto" class="circle-pic"/>

    <div class="user-fullName">
      <p class="userName">{{ userName }}</p>
      <p class="userLastName">{{ lastName }}</p>
      <p class="line-userName"></p>
    </div>

    <div class="myStatusChart">
      <p class="title-chart">My Status Tasks</p>
      <p class="line-chart"></p>
      <div class="chartjs-location">
        <chartjs-doughnut class="chartjs-render-monitor" style="margin: -60px 0 0 50px"
                          :labels="labels"
                          :dataSets="dataSets"
                          :option="option">
        </chartjs-doughnut>
      </div>
    </div>

    <div class="user-details">
      <q-icon class="icon-email" name="email"></q-icon>
      <p class="userEmail">{{ userEmail }}</p>
      <q-icon class="icon-birthday" name="card_giftcard"></q-icon>
      <p class="userBirthday"> 13 Feb</p>
      <q-icon class="icon-person" name="person"></q-icon>
      <p class="userSex">Female</p>
    </div>
  </div>
  <!--  </q-layout>-->

</template>

<script>
import firebaseI from '../middleware/firebase'


export default {
  name: "Profile",
  // components: {ChartJS},
  data() {
    let fullName = window.user.displayName.split(' ');
    return {
      userName: fullName[0],
      lastName: fullName[1],
      userPhoto: window.user.photoURL,
      userEmail: window.user.email,
      labels: ['kids', 'office', 'home', 'beauty', 'work'],
      dataSets: [{
        label: 'This month',
        position: 'bottom',
        data: [40, 40, 80, 55, 60],
        backgroundColor: ['#FF6384', '#36A2EB', '#97ff63', '#FFCE56', '#ff2626'],
        hoverOffset: 5,
        borderColor: ['#9a9999', '#FF6384'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#97ff63', '#FFCE56', '#ff2626'],
        borderWidth: 1
      }],
      option: {
        title: {
          display: true,
          position: 'left',
          text: null
        }
      },
      currentMonth: null,
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  methods: {
    singOut() {
      debugger
      firebaseI.auth.signOut().then(() => {
        debugger
        if (!window.user) {
          this.$router.push('/');
        }

      }).catch((error) => {
        console.error(error);
      });
    },
  },
  created() {
    debugger
    if (`${new Date().getMonth().toString()}`) {
      let monthly = new Date().getMonth();
      this.option.title.text = this.months[monthly]
    }
  }

}
</script>

<style scoped>
.bgP {
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  width: 460px;
  height: 100%;
  background-color: #221738;
}

.first-circle-pic {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: #5B3E96;
  margin: 15px 130px 0 -100px
}

.second-circle-pic {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #8f67ea;
  margin: 30px 130px 0 -100px
}

.circle-pic {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #b69efc;
  margin: 40px 37px 0 -192px;
  /*position: absolute*/
}

.logOut-btn {
  width: 100px;
  height: 50px;
  color: orange;
  font-weight: bold;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  left: 270px
}

.user-fullName {
  position: absolute;
  /*left: 35%;*/
  /*right: 8%;*/
  margin: -15px 0px 0 124px;
  width: 220px;
  top: 13%;
  /*bottom: 45%;*/
  height: 100px;
  /*border: 2px solid #FFFFFF;*/
  display: flex;
}

.userName {
  position: absolute;
  left: -30px;
  right: 0%;
  top: 8%;
  /*bottom: 75%;*/
  color: #FFFFFF;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-size: 21px;
  font-weight: bold;
}

.userLastName {
  position: absolute;
  left: -30px;
  right: 0%;
  top: 40px;
  /*bottom: 75%;*/
  color: #FFFFFF;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-size: 21px;
  font-weight: bold;
}

.line-userName {
  position: absolute;
  left: 30%;
  right: -57px;
  top: 85%;
  /*bottom: 75%;*/
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-size: 19px;
  font-weight: bold;
  border: 1px solid grey;
}

.myStatusChart {
  position: relative;
  display: flex;
  /*left: 2%;*/
  /*right: 2%;*/
  top: 10%;
  /*bottom: 45%;*/
  height: 200px;
  width: 100%;
  /*border: 2px solid #FFFFFF;*/
}

.chartjs-location {
  position: absolute;
  width: 350px;
  height: 150px;
  margin: 22% 0 0 20%
}

.title-chart {
  position: absolute;
  left: 53px;
  top: -30px;
  color: #FFFFFF;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-size: 21px;
  font-weight: bold;
}

.line-chart {
  position: absolute;
  left: 0%;
  right: 222px;
  top: 10%;
  /*bottom: 75%;*/
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-size: 19px;
  font-weight: bold;
  border: 1px solid grey;
}

.img-chart {
  position: absolute;
  left: 37%;
  top: 35%;
  width: 60%;
  height: 90%;
  opacity: .8;
}

.user-details {
  position: relative;
  top: 8%;
  width: 96%;
  height: 150px;
}

.icon-email {
  position: absolute;
  left: 7%;
  top: 10%;
  font-size: 30px;
  color: #5B3E96;
}

.icon-birthday {
  position: absolute;
  left: 7%;
  top: 32.5%;
  font-size: 30px;
  color: #5B3E96;
}

.icon-person {
  position: absolute;
  left: 7%;
  top: 55%;
  font-size: 30px;
  color: #5B3E96;
}

.userEmail {
  position: relative;
  width: 200px;
  margin: 15px 0 0 70px;
  font-size: 15px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  color: #FFFFFF;
}

.userBirthday {
  position: relative;
  left: -105px;
  top: 10%;
  font-size: 15px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  color: #FFFFFF;
}

.userSex {
  position: relative;
  left: -105px;
  top: 8%;
  font-size: 15px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  color: #FFFFFF;

}


@media only screen and (min-width: 360px) and (max-width: 450px) {

  .bgP {
    background-color: rgb(20, 10, 38);;
    width: 100%;
  }

  .logOut-btn {
    left: 240px;
    color: orange;
  }

  .line-userName {
    width: 170px;
  }

  .chartjs-location {
    width: 330px;
    height: 200px;
    margin: 31% 0 0 0%
  }

  .user-details {
    top: 14%;
  }

  .userBirthday {
    margin: 15px 0px 0 70px;
    width: 100px;
    left: -10px;
    top: 0px;
  }

  .userSex {
    margin: 15px 0px 0 70px;
    width: 100px;
    left: -10px;
    top: 0px;
  }

  .line-chart {
    width: 220px;
    margin-left: -24px;
    top: 5%;
  }

  .title-chart {
    left: 23px;
  }
}


@media only screen and (min-width: 280px) and (max-width: 340px) {

  .bgP {
    width: 100%;
  }


}

/*  .logOut-btn {*/
/*    left: 170px;*/
/*    color: orange;*/
/*  }*/

/*  .first-circle-pic {*/
/*    margin: 15px 50px 0 -100px*/
/*  }*/

/*  .second-circle-pic {*/
/*    margin: 30px 50px 0 -100px*/
/*  }*/

/*  .circle-pic {*/
/*    margin: 40px 37px 0 -112px*/
/*  }*/

/*  .line-userName {*/
/*    width: 120px;*/
/*  }*/

/*  .userName {*/
/*    position: absolute;*/
/*    width: 100px;*/
/*    margin-left: 55px;*/
/*  }*/

/*  .userLastName {*/
/*    position: absolute;*/
/*    width: 100px;*/
/*    top: 40px;*/
/*    margin-left: 55px;*/

/*  }*/

/*  .user-fullName {*/
/*    width: 150px;*/
/*  }*/

/*  .line-chart {*/
/*    width: 200px;*/
/*    top: 5%;*/
/*  }*/

/*  .title-chart {*/
/*    left: 23px;*/
/*  }*/

/*  .myStatusChart{*/
/*    width: 330px;*/
/*  }*/

/*  .chartjs-location {*/
/*    position: absolute;*/
/*    width: 330px;*/
/*    height: 200px;*/
/*    margin: 31% 0 0 -10%*/
/*  }*/

/*  .icon-email {*/
/*    left: 30px;*/
/*    top: 50px;*/
/*  }*/

/*  .icon-birthday {*/
/*    left: 30px;*/
/*    top: 90px;*/
/*  }*/

/*  .icon-person {*/
/*    left: 30px;*/
/*    top: 130px;*/
/*  }*/

/*  .user-details{*/
/*    width: 330px;*/
/*  }*/

/*  .userEmail {*/
/*    width: 100px;*/
/*    left: 60px;*/
/*    top: 50px;*/
/*  }*/

/*  .userBirthday {*/
/*    left: -50px;*/
/*    top: 55px;*/
/*  }*/

/*  .userSex {*/
/*    left: -50px;*/
/*    top: 55px*/
/*  }*/

/*}*/
</style>
