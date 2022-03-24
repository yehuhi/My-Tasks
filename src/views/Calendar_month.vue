<template>
  <q-layout view="hHh LpR fff" style="background: #140A26; display: flex; flex-direction: column;
   align-items: center">
    <div class="bg" style="max-width: 570px">
      <!-- ADD A NEW TASK -->
      <div class="dialog">
        <q-dialog v-model="addTask1" transition-show="rotate" transition-hide="rotate">
          <q-card class="new-task">
            <p class="title-create-task">Create New Task</p>
            <p class="line-create-task"></p>
            <div class="allFieldsAddTask">
              <div class="topic">
                <q-input v-model="newTask.task" label-color="purple-10" label="Topic"/>
              </div>
              <div class="description">
                <q-input v-model="newTask.description" label-color="purple-10" label="Description"/>
              </div>
              <div class="hour-task">
                <q-input v-model="newTask.hour" mask="time" :rules="['time']">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="newTask.hour" format24h style="border: #5B3E96" color="purple-10">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="purple-10" flat/>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="date-task">
                <q-input v-model="newTask.date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="newTask.date" color="purple-10">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="purple-10" flat/>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <q-btn flat class="addBtn" @click="addNewTask">ADD</q-btn>
            </div>
          </q-card>
        </q-dialog>
      </div>

      <div class="dialog">
        <q-dialog v-model="editTask" transition-show="rotate" transition-hide="rotate">
          <q-card class="new-task">
            <p class="title-create-task">Edit Task</p>
            <p class="line-edit-task"></p>
            <div class="allFieldsAddTask">
              <div class="topic">
                <q-input v-model="editoTask.task" label-color="purple-10" label="Topic"/>
              </div>
              <div class="description">
                <q-input v-model="editoTask.description" label-color="purple-10" label="Description"/>
              </div>
              <div class="hour-task">
                <q-input v-model="editoTask.hour" mask="time" :rules="['time']">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="editoTask.hour" format24h style="border: #5B3E96" color="purple-10">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="purple-10" flat/>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="date-task">
                <q-input v-model="editoTask.date" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="editoTask.date" color="purple-10">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="purple-10" flat/>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <q-btn flat class="editBtn" @click="editNewTask(editoTask.taskID)">Edit</q-btn>
            </div>
          </q-card>
        </q-dialog>
      </div>

      <div v-if="toggleModel === 'month' || toggleModel === 'daily' ||  calendarAccess" class="title">My Tasks</div>

      <div v-if="toggleModel === 'month' || toggleModel === 'daily' ||  calendarAccess" class="toggle">
        <q-btn-toggle
            v-model="toggleModel"
            class="toggle-btn toggle-txt-btn"
            size="150"
            spread
            no-caps
            rounded
            text-color="white"
            toggle-color="white"
            toggle-text-color="#5B3E96"
            :options="[
          {label: 'Monthly', value: 'month'},
          {label: 'Daily', value: 'daily'}
        ]"
        />
      </div>

      <p v-if="toggleModel === 'daily'" class="title-Date-Daily">
        {{ newDate ? newDate : defaultDate }}</p>
      <!--      calendar-->
      <div v-if="newDailydate !== true" class="calendar">
        <q-date
            v-model="date"
            dark flat minimal
            color="transparent"
            style="background-color: #140A26"
            :events="events"
            :event-color="(date) => date[9] % 2 === 0 ? 'orange' : 'orange'"
        />
      </div>

      <div v-if="toggleModel === 'month' || newDailydate !== true" class="task items-start row scroll"
      >

        <p v-if="!newDate" class="title-this-month">Today</p>

        <p v-if="newDate" class="title-Date">{{ newDate }}</p>

        <p v-if="!getTasks[0]"
           class="insert-task-txt">
          PLEASE INSERT A NEW TASK :)</p>
        <q-card class="task-card" flat v-for="(getTask, indx) in getTasks" :key="indx" @click="taskDetail(indx)">
          <q-icon class="checkbox-icon" name="check"></q-icon>
          <p class="task-font">{{ getTask.task }}</p>
          <p class="task-hour">{{ getTask.hour }}</p>
        </q-card>
      </div>

      <div>
        <q-dialog v-model="deleteTask">
          <q-card style="width: 300px; height: 250px">
            <div style="width: 15px; height: 15px; border-radius: 50%; background-color: orange;
                margin: 20px 0 0 40px"></div>
            <p style="font-size: 18px; font-weight: bold; font-family: Comic Sans MS; margin: -23px 0 0 65px; ">
              {{ taskDialog }}</p>
            <div>
              <q-icon name="event" style="color:black; font-size: 28px; margin: 30px 0 0 40px"></q-icon>
            </div>
            <p style="color: #5B3E96; font-size: 12px; font-family: Comic Sans MS; margin: -23px 0 0 110px ">
              {{ taskDateDialog }}</p>
            <div style="width: 5px; height: 5px; border-radius: 50%; background-color: black;
                margin: -12px 0 0 151px"></div>
            <p style="color: #5B3E96; font-size: 12px; font-family: Comic Sans MS; margin: -12px 0 0 167px ">
              {{ taskHourDialog }}</p>
            <p style="font-size: 13px; font-weight: bold; font-family: Comic Sans MS;
           width: 300px; padding: 25px 40px 0 40px; ">
              {{ taskDescDialog }}</p>
            <q-btn
                style="width: 100% ;height: 45px; background-color: #ec4444; color: white; top: 82%; position: absolute"
                @click="removeTask1">
              Delete
            </q-btn>
          </q-card>
        </q-dialog>
      </div>

      <div>
        <q-dialog v-model="taskDetails">
          <q-card style="width: 300px; height: 250px">
            <div style="width: 15px; height: 15px; border-radius: 50%; background-color: orange;
                margin: 20px 0 0 40px"></div>
            <p style="font-size: 18px; font-weight: bold; font-family: Comic Sans MS; margin: -23px 0 0 65px; ">
              {{ taskDialog }}</p>
            <div>
              <q-icon name="event" style="color:black; font-size: 28px; margin: 30px 0 0 40px"></q-icon>
            </div>
            <p style="color: #5B3E96; font-size: 12px; font-family: Comic Sans MS; margin: -23px 0 0 80px ">
              {{ taskDateDialog }}</p>
            <div style="width: 5px; height: 5px; border-radius: 50%; background-color: black;
                margin: -11px 0 0 156px"></div>
            <p style="color: #5B3E96; font-size: 12px; font-family: Comic Sans MS; margin: -12px 0 0 167px ">
              {{ taskHourDialog }}</p>
            <p style="font-size: 15px; font-weight: bold; font-family: Comic Sans MS;
           width: 300px; padding: 35px 40px 0 40px; ">
              {{ taskDescDialog }}</p>
          </q-card>
        </q-dialog>
      </div>

      <Daily v-if="toggleModel === 'daily'" :addBtnDialog="addTask1" :arrTasks="getTasks"
             @goToEditTask="goToEditTask" @removeTask1="removeTask1"/>
      <Profile v-if="!calendarAccess && profileAccess"/>

      <div v-if="!newDailydate" class="menu">
        <div class="add-location">
          <q-btn class="add-oval">
            <div class="add-plus" @click="addTaskFn">+</div>
          </q-btn>
        </div>

        <div class="menu-icons-location-profile">
          <q-btn icon="person" class="menu-user-icon" flat @click="userProfile"></q-btn>
          <q-btn icon="notes" class="menu-list-icon" flat @click="calendarHome"></q-btn>
        </div>
      </div>

      <div v-if="newDailydate" class="menuDaily">
        <div class="add-location">
          <q-btn class="add-oval-daily">
            <div class="add-plus" @click="addTaskFn">+</div>
          </q-btn>
        </div>

        <div class="menu-icons-location">
          <q-btn icon="person" class="menu-user-icon-daily" flat @click="userProfile"></q-btn>
          <q-btn icon="notes" class="menu-list-icon-daily" flat @click="calendarHome"></q-btn>
        </div>
      </div>
    </div>
  </q-layout>

</template>

<script>

import Daily from "../components/Daily";
import Profile from "../components/Profile";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "Calendar",
  components: {Profile, Daily},
  data() {
    let date = new Date();
    let defaultDate = `${date.getDate()}/${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}/${date.getFullYear()}`;
    return {
      data: date,
      taskDialog: null,
      taskDateDialog: null,
      taskHourDialog: null,
      taskDescDialog: null,
      taskID: null,
      deleteTask: false,
      index: null,
      currentHour: `${(new Date().getHours()) < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${(new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`,
      dateDefault: `${new Date().getFullYear()}/${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : ''}/${(new Date().getDate()) < 10 ? `0${new Date().getDate()}` : (new Date().getDate())}`,
      alertush: false,
      newTask: {
        task: '',
        description: '',
        hour: `${(new Date().getHours()) < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${(new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`,
        date: `${new Date().getFullYear()}/${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : ''}/${(new Date().getDate()) < 10 ? `0${new Date().getDate()}` : (new Date().getDate())}`,
      },
      editoTask: {
        taskID: '',
        task: '',
        description: '',
        hour: `${(new Date().getHours()) < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${(new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`,
        date: `${new Date().getFullYear()}/${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : ''}/${(new Date().getDate()) < 10 ? `0${new Date().getDate()}` : (new Date().getDate())}`,
      },
      editTask: false,
      addTask1: false,
      toggleModel: 'month',
      newDaily: 'month',
      defaultDate: `Date - ${defaultDate}`,
      date: `${new Date().getFullYear()}/${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}/${(new Date().getDate()) < 10 ? `0${new Date().getDate()}` : (new Date().getDate())}`,
      events: [],
      newDailydate: false,
      profileAccess: false,
      calendarAccess: false,
      taskDetails: false,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
          ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
          ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      newDate: null,
      getTasks: [],
      indexTest: null

    }
  },
  watch: {
    date(value, oldValue) {
      let date = null;
      let year = null;
      let month = null;
      let day = null;

      if (value !== oldValue) {
        if (value === null) {
          return
        }
        date = value.split('/')
        year = date[0];
        month = date[1];
        day = date[2];
        this.newDate = `Date - ${day}/${month}/${year}`;
        debugger
        this.get_user_tasks().then(res => {
          debugger
          this.getTasks = [];
          for (const key of res) {
            if (key.date === value) {
              if (key.date !== this.newTask.date) {
                this.getTasks.push(key);
              } else if (key.hour > this.newTask.hour) {
                this.getTasks.push(key);
              }
            }
            this.events.push(key.date);
          }
        });
      }
    },

    toggleModel(value, oldValue) {
      debugger
      if (value !== oldValue) {
        if (value === 'daily') {
          this.newDaily = value;
          this.newDailydate = true;
        } else {
          this.newDailydate = false;
        }
      }
    },
    ...mapState('tasks', ['userTasks'])
  },
  methods: {
    ...mapMutations('tasks', ['newTaskUser', 'user_Task', 'editTaskUser', 'removeTaskUser']),
    ...mapActions('tasks', ['newUserTasK', 'get_user_tasks', 'updateTask', 'removeTasks']),

    addTaskFn() {
      debugger
      this.addTask1 = true;
    },

    addNewTask() {
      debugger
      this.newTaskUser(this.newTask);
      debugger
      this.newUserTasK();
      debugger
      let date = null;
      let year = null;
      let month = null;
      let day = null;
      date = this.newTask.date.split('/');
      year = date[0];
      month = date[1];
      day = date[2];
      debugger
      this.newDate = `Date - ${day}/${month}/${year}`;
      this.get_user_tasks().then(res => {
        debugger
        this.getTasks = [];
        for (const key of res) {
          if (key.date === this.newTask.date) {
            if (key.hour > this.currentHour) {
              this.getTasks.push(key);
            }
          }
          this.events.push(key.date);
        }
        let taskTest = this.getTasks.filter(task => task.date === this.newTask.date)
        console.log(taskTest)
        this.newTask = {
          task: '',
          description: '',
          hour: `${(new Date().getHours()) < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${(new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`,
          date: `${new Date().getFullYear()}/${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : ''}/${(new Date().getDate()) < 10 ? `0${new Date().getDate()}` : (new Date().getDate())}`,
        }
      });
      this.addTask1 = false;
      this.$q.notify('New Task Add')
    },

    goToEditTask(indexRemove, taskId) {
      this.indexTest = indexRemove;
      this.dataTask(indexRemove);
      this.editoTask.task = this.taskDialog;
      this.editoTask.description = this.taskDescDialog;
      this.editoTask.date = this.taskDateDialog;
      this.editoTask.hour = this.taskHourDialog;
      this.editoTask.taskID = this.taskID;
      this.editTask = true;
    },

    editNewTask() {
      // Edit data to Task
      debugger
      this.editTaskUser(this.editoTask);
      this.updateTask();
      this.getTasks[this.indexTest] = this.editoTask;
      debugger

      if (this.dateDefault !== this.editoTask.date) {
        debugger
        let date = null;
        let year = null;
        let month = null;
        let day = null;
        date = this.editoTask.date.split('/')
        year = date[0];
        month = date[1];
        day = date[2];
        debugger
        this.newDate = `Date - ${day}/${month}/${year}`;
        this.get_user_tasks().then(res => {
          debugger
          this.getTasks = [];
          for (const key of res) {
            if (key.date === this.editoTask.date) {
              this.getTasks.push(key);
            }
            this.events.push(key.date);
          }
          this.getTasks.filter(task => task.date === this.editoTask.date)
        });
      }
      this.editTask = false;
      this.$q.notify('Task Edited')
    },

    dataTask(indexRemove) {
      debugger
      this.taskDialog = this.getTasks[indexRemove].task;
      this.taskDateDialog = this.getTasks[indexRemove].date;
      this.taskHourDialog = this.getTasks[indexRemove].hour;
      this.taskDescDialog = this.getTasks[indexRemove].description;
      if (this.getTasks[indexRemove].id) {
        this.taskID = this.getTasks[indexRemove].id;
      }
    },

    removeTask1(index) {
      debugger
      this.removeTaskUser(this.getTasks[index]);
      this.removeTasks();
      let tasks = [];

      for (let i = 0; i < this.getTasks.length; i++) {
        if (this.getTasks[i].date === this.getTasks[index].date && this.getTasks[i].id !== this.getTasks[index].id) {
          tasks.push(this.getTasks[i]);
        }
      }
      this.getTasks = tasks;
      debugger
      let taskTest = this.getTasks.filter(task => task.date !== this.getTasks[index].date)
      this.alertDeleteTask = false;
      this.$q.notify('Task Deleted !')
    },

    userProfile() {
      debugger
      // this.$router.push('/profile');
      this.profileAccess = true;
      this.calendarAccess = false;
    },

    calendarHome() {
      debugger
      this.calendarAccess = true;
      this.profileAccess = false;
    },

    taskDetail(index) {
      this.index = index;
      this.dataTask(index);
      this.taskDetails = true;
    },

  },
  created() {
    debugger
    this.get_user_tasks().then(res => {
      debugger
      this.getTasks = [];
      for (const key of res) {
        if (key.date === this.newTask.date) {
          if (key.hour > this.newTask.hour) {
            this.getTasks.push(key);
          }
        }
        this.events.push(key.date);
      }
    });
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

.bg {
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 13px;
  background: #140A26;
}

.title {
  position: absolute;
  /*left: 37.57%;*/
  /*right: 40.95%;*/
  top: 0.71%;
  /*bottom: 87.44%;*/
  color: #FFFFFF;
  width: 120px;
  font-weight: bold;
  font-size: 25px;
  background: #140A26;
}


.toggle {
  height: 50px;
}

.toggle-btn {
  position: absolute;
  left: 20.16%;
  right: 20.13%;
  top: 7%;
  /*bottom: 85.94%;*/
  background: #FFFFFF;
  border: 1px solid rgba(200, 205, 218, 0.306754);
  box-sizing: border-box;
  border-radius: 100px;
  height: 40px;
}

.toggle-txt-btn {
  background-color: #5B3E96;
  color: #5B3E96;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-weight: bold
}

.calendar {
  /*position: relative;*/
  /*left: 15%;*/
  /*right: 15%;*/
  /*top: 13%;*/
  margin-top: 40px;
  /*bottom: 0%;*/
  border: none;
}


.task {
  position: relative;
  display: flex;
  /*flex-direction: column;*/
  justify-content: center;
  align-content: flex-start;
  /*left: 0%;*/
  /*right: 0%;*/
  width: 80%;
  height: 300px;
  margin: -30px 0 0 0;
  /*bottom: 10.47%;*/
  /*max-height: 500px;*/
  background: #221738;
  /*border: 1px solid #FFFFFF;*/
}

.title-this-month {
  position: relative;
  left: -36.5%;
  /*right: 24.29%;*/
  top: 5px;
  /*bottom: 36.95%;*/
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  /* identical to box height */
  /*text-align: justify;*/
  color: orange;
}

.title-Date {
  position: relative;
  left: -25%;
  /*right: 24.29%;*/
  top: 5px;
  /*bottom: 36.95%;*/
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  /* identical to box height */
  text-align: justify;
  color: orange;
}

.title-Date-Daily {
  position: absolute;
  left: 10.49%;
  /*right: 24.29%;*/
  /*width: 150px;*/
  height: 50px;
  top: 14%;
  bottom: 39.95%;
  /*margin-bottom: 10px;*/
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  /* identical to box height */
  text-align: justify;
  color: orange;
}

.task-card {
  position: relative;
  display: flex;
  /*flex-direction: column;*/
  /*flex-wrap: nowrap;*/
  /*left: 11.49%;*/
  /*right: 13.13%;*/
  width: 90%;
  top: 15px;
  margin-bottom: 10px;
  /*bottom: 28.2%;*/
  /*width: 320px;*/
  height: 55px;
  border-radius: 5px;
  background-color: #FFFFFF;
}

.checkbox-icon {
  position: absolute;
  left: 3.21%;
  right: 91.07%;
  top: 35.42%;
  bottom: 31.25%;
  color: #140A26;
  /*background: url(Image.png);*/
  mix-blend-mode: normal;
  opacity: 0.5;
}

.task-font {
  position: absolute;
  left: 10.71%;
  /*right: 54.29%;*/
  top: 35%;
  width: 150px;
  /*bottom: -4.17%;*/
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: justify;
  color: #5B3E96;
}

.insert-task-txt {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 50px 40px 0 40px
}

.task-date {
  position: absolute;
  height: 33px;
  left: 47.5%;
  right: 28.57%;
  top: calc(50% - 33px / 2 + 8.5px);
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: justify;
  color: #050505;
}

.task-hour {
  position: absolute;
  height: 33px;
  left: 78.21%;
  right: 7.86%;
  top: calc(50% - 33px / 2 + 8.5px);
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 16px;
  text-align: justify;
  color: #5B3E96;
}

.card-slide-transition {
  background-color: #FFFFFF;
  margin: 50px 0;
}

.view-details {
  position: absolute;
  left: 2%;
  right: 60.53%;
  top: 25.62%;
  bottom: 22.29%;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  width: 150px;
  /* identical to box height */
  text-align: justify;
  color: #140A26;
}

.section-details {
  height: 50px;
}

.line {
  position: absolute;
  left: 73.87%;
  right: 25.33%;
  top: 20%;
  bottom: 22.04%;
  mix-blend-mode: normal;
  opacity: 0.44;
  height: 30px;
  border: 1px solid #979797;
}

.garbage {
  position: absolute;
  width: 25px;
  font-size: 25px;
  left: 280px;
  top: 12px;
  color: red;
}

.task-card-2 {
  position: absolute;
  left: 11.49%;
  right: 13.13%;
  margin: 125px 0;
  /*margin-top: 12.89%;*/
  /*bottom: 28.2%;*/
  width: 320px;
  height: 55px;
  border-radius: 5px;
  background-color: #FFFFFF;
}

.task-card-3 {
  position: absolute;
  left: 11.49%;
  right: 13.13%;
  top: 64.89%;
  bottom: 28.2%;
  width: 320px;
  height: 55px;
  border-radius: 5px;
  background-color: #FFFFFF;
}

.menu {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /*left: 0%;*/
  /*right: 0%;*/
  /*top: 85.33%;*/
  margin-top: -20px;
  /*bottom: 0;*/
  width: 100%;
  height: 100px;
  /*bottom: 4.19%;*/
  /*border: 1px solid #FFFFFF;*/
}

.menuDaily {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /*left: 0%;*/
  /*right: 0%;*/
  top: 90%;
  /*margin-top: -20px;*/
  /*bottom: 0;*/
  width: 90%;
  /*height: 80px;*/
  /*bottom: 4.19%;*/
  /*border: 1px solid #FFFFFF;*/
}

.add-location {
  position: absolute;
  /*left: 42.4%;*/
  /*right: 42.13%;*/
  /*top: -2%;*/
  /*bottom: 24.68%;*/
  /*border: 1px solid #FFFFFF;*/
}

.add-oval {
  position: relative;
  margin-top: -55px;
  width: 50px;
  height: 50px;
  background: #5B3E96;
  border-radius: 50%;
  z-index: 9000;
  border: 1px solid whitesmoke;
  box-shadow: 0px 20px 30px rgba(91, 62, 150, 0.4);
}

.add-oval-daily {
  position: relative;
  margin-top: -60px;
  width: 50px;
  height: 50px;
  background: #5B3E96;
  border-radius: 50%;
  z-index: 9000;
  border: 1px solid whitesmoke;
  box-shadow: 0px 20px 30px rgba(91, 62, 150, 0.4);
}

.add-plus {
  position: absolute;
  width: 29px;
  margin-top: 0px;
  color: #FFFFFF;
  font-size: 50px;
}

.menu-icons-location {
  margin-top: -3px;
  position: relative;
  width: 98%;
  height: 59px;
  background-color: #140A26;
}

.menu-icons-location-profile {
  position: absolute;
  height: 59px;
  background-color: #140A26;
}


.menu-user-icon {
  position: absolute;
  /*left: 75.47%;*/
  /*right: 17.21%;*/
  text-decoration: none;
  margin-left: 73px;
  top: 1px;
  /*bottom: 19.18%;*/
  color: #FFFFFF;
  mix-blend-mode: normal;
  font-size: 22px;
  /*opacity: 0.1;*/
}

.menu-user-icon-daily {
  position: absolute;
  text-decoration: none;
  margin-left: 73px;
  top: 0;
  color: #FFFFFF;
  mix-blend-mode: normal;
  font-size: 22px;
}

.menu-notifications-icon {
  position: absolute;
  left: 65.05%;
  right: 27.56%;
  top: -30%;
  bottom: 19.18%;
  color: #FFFFFF;
  mix-blend-mode: normal;
  font-size: 19px /*opacity: 0.5;*/
}

.menu-clock-icon {
  position: absolute;
  left: 25.47%;
  right: 67.2%;
  top: -35%;
  bottom: 19.18%;
  /*background: #243B6B;*/
  color: #FFFFFF;
  mix-blend-mode: normal;
  font-size: 18px;
  /*opacity: 0.1;*/
}

.menu-list-icon {
  position: absolute;
  margin-left: -150px;
  top: -5%;
  bottom: 19.18%;
  /*background: #243B6B;*/
  color: #FFFFFF;
  mix-blend-mode: normal;
  font-size: 25px;
  /*opacity: 0.1;*/
}

.menu-list-icon-daily {
  position: absolute;
  margin-left: -150px;
  top: -5px;
  bottom: 19.18%;
  color: #FFFFFF;
  mix-blend-mode: normal;
  font-size: 25px;
}

.menu-bottom {
  position: absolute;
  left: 0%;
  right: 0%;
  top: 35.06%;
  bottom: -44.16%;
  background: rgba(239, 245, 248, 0.827983);
  backdrop-filter: blur(24.0353px);
}

.allFieldsAddTask {
  width: 90%;
  height: 100%;
}

.new-task {
  position: absolute;
  width: 90%;
  height: 78%;
  /*left: 10%;*/
  /*right: 10%;*/
  top: 5%;
  /*border: 4px solid #000000;*/
  background-color: #ffffff;
}

.title-create-task {
  position: absolute;
  left: 9.27%;
  right: 33.33%;
  top: 4.84%;
  bottom: 85.59%;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  /* identical to box height */
  text-align: justify;
  color: #5B3E96;
}


.line-create-task {
  position: absolute;
  left: 45%;
  right: 12%;
  top: 8%;
  bottom: 96.13%;
  mix-blend-mode: normal;
  opacity: 0.36;
  border: 1px solid #979797;
}

.line-edit-task {
  position: absolute;
  left: 33%;
  right: 12%;
  top: 8%;
  bottom: 96.13%;
  mix-blend-mode: normal;
  opacity: 0.36;
  border: 1px solid #979797;
}

.topic {
  position: absolute;
  left: 10.27%;
  right: 12.8%;
  top: 14.1%;
  bottom: 67.25%;
  /*border: 1px solid #5B3E96;*/
}

.description {
  position: absolute;
  left: 10.27%;
  right: 12.8%;
  top: 32.5%;
  bottom: 67.25%;
  /*border: 1px solid #5B3E96;*/
}

.hour-task {
  position: absolute;
  left: 10.27%;
  right: 12.8%;
  top: 51.5%;
  bottom: 0%;
}

.date-task {
  position: absolute;
  left: 10.27%;
  right: 12.8%;
  top: 70.5%;
  bottom: 0%;
}

.addBtn {
  position: absolute;
  /*padding: 40px 150px;*/
  width: 100%;
  top: 90%;
  bottom: 0%;
  font-size: 18px;
  color: #FFFFFF;
  background: #5B3E96;
  border-radius: 0;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
}

.editBtn {
  position: absolute;
  width: 100%;
  top: 90%;
  bottom: 0%;
  font-size: 18px;
  color: #FFFFFF;
  background: #4ba5ff;
  border-radius: 0;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
}

.q-field__control {
  color: #5B3E96;
}

@media only screen and (min-width: 360px) and (max-width: 450px) {
  .bg {
    /*position: relative;*/
    width: 95%;
  }

  .menuDaily {
    width: 95%;
  }

  .title-Date {
    left: -18%;
  }

  .line-create-task {
    position: absolute;
    left: 65%;
    right: 12%;
    top: 7%;
  }
  .line-edit-task {
    position: absolute;
    left: 42%;
    right: 12%;
    top: 7%;
  }

  .title-Date-Daily {
    left: 6.49%;
  }

  .task {
    left: -1%;
    width: 90%;
  }
}

@media only screen and (min-width: 280px) and (max-width: 340px) {
  .bg {
    width: 90%;
  }
}

/*  .title-Date {*/
/*    left: -10%;*/
/*  }*/

/*  .title-this-month {*/
/*    left: -30.5%;*/
/*  }*/

/*  .checkbox-icon {*/
/*    top: 38.42%;*/
/*  }*/

/*  .task-hour {*/
/*    font-size: 12px;*/
/*  }*/

/*  .task-font {*/
/*    font-size: 12px;*/
/*  }*/

/*  .insert-task-txt {*/
/*    font-size: 20px;*/
/*    font-weight: bold;*/
/*    text-align: center;*/
/*    margin: 75px 40px 0 40px*/
/*  }*/

/*  .menu-user-icon {*/
/*    margin-left: 43px;*/
/*  }*/

/*  .menu-list-icon {*/
/*    margin-left: -120px;*/
/*  }*/

/*  .menu-icons-location {*/
/*    margin-top: 0px;*/
/*  }*/

/*  .menu-user-icon-daily {*/
/*    margin-left: 43px;*/
/*  }*/

/*  .menu-list-icon-daily {*/
/*    margin-left: -120px;*/
/*  }*/
/*}*/


</style>
