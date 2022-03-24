<template>
  <div class="tasks-cards-daily scroll">
    <div class="daily-screen">
      <p style="color: transparent">{{ taskComplete.task }}

      <p v-if="getTasks[0]" class="drag-delete">Drag to Delete --> </p>
      <p v-if="getTasks[0]" class="drag-edit"><-- Drag to Edit </p>
      <p v-if="!getTasks[0]"
         style="font-size: 30px; font-weight: bold; text-align: center; margin: 130px 40px 0 40px"> PLEASE INSERT A
        NEW TASK
        :)</p>
      <q-slide-item @click="taskDetail(i)" v-for="(getTask, i) in getTasks" :key="i" @left="opt => onLeft(opt, i)"
                    @right="opt => onRight(opt, i)"
                    left-color="red"
                    right-color="blue"
                    class="slide-item ">
        <template v-slot:left>
          <p class="slide-text">Delete</p>
        </template>
        <template v-slot:right>
          <p class="slide-text">Edit</p>
        </template>
        <q-item>
          <q-item-section class="item-section">{{ getTask.task }}</q-item-section>
          <p class="item-section-hour">{{ getTask.hour }}</p>
        </q-item>
      </q-slide-item>

      <div>
        <q-dialog v-model="taskDetails">
          <q-card style="width: 300px; height: 250px">
            <div style="width: 15px; height: 15px; border-radius: 50%; background-color: orange;
                margin: 20px 0 0 40px"></div>
            <p style="font-size: 18px; font-weight: bold; font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif; margin: -23px 0 0 65px; ">
              {{ taskDialog }}</p>
            <div>
              <q-icon name="event" style="color:black; font-size: 28px; margin: 30px 0 0 40px"></q-icon>
            </div>
            <p style="color: #5B3E96; font-size: 12px;
             font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif; margin: -23px 0 0 80px ">
              {{ taskDateDialog }}</p>
            <div style="width: 5px; height: 5px; border-radius: 50%; background-color: black;
                margin: -11px 0 0 156px"></div>
            <p style="color: #5B3E96; font-size: 12px; font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif; margin: -12px 0 0 167px ">
              {{ taskHourDialog }}</p>
            <p style="font-size: 15px; font-weight: bold; font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
           width: 300px; padding: 35px 40px 0 40px; ">
              {{ taskDescDialog }}</p>
          </q-card>
        </q-dialog>
      </div>

      <div>
        <q-dialog v-model="alertDeleteTask">
          <q-card style="width: 300px; height: 250px">
            <div style="width: 15px; height: 15px; border-radius: 50%; background-color: orange;
                margin: 20px 0 0 40px"></div>
            <p style="font-size: 18px; font-weight: bold; font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif; margin: -23px 0 0 65px; ">
              {{ taskDialog }}</p>
            <div>
              <q-icon name="event" style="color:black; font-size: 28px; margin: 30px 0 0 40px"></q-icon>
            </div>
            <p style="color: #5B3E96; font-size: 12px; font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif; margin: -23px 0 0 80px ">
              {{ taskDateDialog }}</p>
            <div style="width: 5px; height: 5px; border-radius: 50%; background-color: black;
                margin: -11px 0 0 156px"></div>
            <p style="color: #5B3E96; font-size: 12px; font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif; margin: -12px 0 0 167px ">
              {{ taskHourDialog }}</p>
            <p style="font-size: 15px; font-weight: bold;font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
           width: 300px; padding: 35px 40px 0 40px; ">
              {{ taskDescDialog }}</p>
            <q-btn
                style="width: 100% ;height: 45px; background-color: #ec4444; color: white; top: 82%; position: absolute"
                @click="removeTask">
              Delete
            </q-btn>
          </q-card>
        </q-dialog>
      </div>

      <div>
        <q-dialog v-model="alertEditTask">
          <q-card style="width: 300px; height: 250px">
            <div style="width: 15px; height: 15px; border-radius: 50%; background-color: orange;
                margin: 20px 0 0 40px"></div>
            <p style="font-size: 18px; font-weight: bold; font-family: Comic Sans MS, 'Chalkboard SE', 'Comic Neue', 'sans-serif'; margin: -23px 0 0 65px; ">
              {{ taskDialog }}</p>
            <div>
              <q-icon name="event" style="color:black; font-size: 28px; margin: 30px 0 0 40px"></q-icon>
            </div>
            <p style="color: #5B3E96; font-size: 12px; font-family: Comic Sans MS, 'Chalkboard SE', 'Comic Neue', 'sans-serif'; margin: -23px 0 0 80px ">
              {{ taskDateDialog }}</p>
            <div style="width: 5px; height: 5px; border-radius: 50%; background-color: black;
                margin: -11px 0 0 156px"></div>
            <p style="color: #5B3E96; font-size: 12px; font-family: Comic Sans MS,'Chalkboard SE', 'Comic Neue', 'sans-serif'; margin: -12px 0 0 167px ">
              {{ taskHourDialog }}</p>
            <p style="font-size: 15px; font-weight: bold; font-family: Comic Sans MS, 'Chalkboard SE', 'Comic Neue', 'sans-serif';
           width: 300px; padding: 35px 40px 0 40px; ">
              {{ taskDescDialog }}</p>
            <q-btn
                style="width: 100% ;height: 45px; background-color: #4ba5ff; color: white; top: 82%; position: absolute"
                @click="editTask">
              Edit
            </q-btn>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "Daily",
  props: ['addTask1', 'arrTasks'],
  data() {
    return {
      indexRemove: null,
      taskDetails: false,
      taskDialog: null,
      taskDateDialog: null,
      taskHourDialog: null,
      taskDescDialog: null,
      taskID: null,
      alertDeleteTask: false,
      alertEditTask: false,
      getTasks: [],
    }
  },
  computed: {
    ...mapState('tasks', ['editTaskAdd']),
    taskComplete: function () {
      debugger
      this.getTasks = this.arrTasks;
      return this.editTaskAdd
    },
  },
  methods: {
    ...mapActions('tasks', ['removeTasks', 'get_user_tasks']),
    ...mapMutations('tasks', ['removeTaskUser']),

    removeTask() {
      debugger
      this.alertDeleteTask = false;
      this.$emit('removeTask1', this.indexRemove)
    },

    taskDetail(index) {
      this.indexRemove = index;
      this.dataTasks();
      this.taskDetails = true;
    },

    editTask() {
      debugger
      if (this.indexRemove) {
      }
      this.alertEditTask = false;
      this.$emit('goToEditTask', this.indexRemove); //, this.taskID
    },

    dataTasks(editObj) {
      debugger
      if (editObj) {
        this.indexRemove = editObj;
      }
      this.taskDialog = this.getTasks[this.indexRemove].task;
      this.taskDateDialog = this.getTasks[this.indexRemove].date;
      this.taskHourDialog = this.getTasks[this.indexRemove].hour;
      this.taskDescDialog = this.getTasks[this.indexRemove].description;
      this.id = this.getTasks[this.indexRemove].id;
    },

    onLeft({reset}, index) {
      this.indexRemove = index;
      this.dataTasks();
      this.alertDeleteTask = true;
      this.finalize(reset)
    },

    onRight({reset}, index) {
      this.indexRemove = index;
      this.dataTasks();
      this.alertEditTask = true;
      this.finalize(reset)
    },

    finalize(reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    },

    beforeDestroy() {
      clearTimeout(this.timer)
    }
  },
  created() {
    this.getTasks = this.arrTasks;
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

.daily-screen {
  width: 100%
}

.tasks-cards-daily {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 80%;
  height: 452px;
  top: 12%;
  padding: 20px 0 40px 0;
  /*margin-top: 50px;*/
  background: #221738;
}


.slide-item {
  width: 85%;
  height: 70px;
  border-radius: 5px;
  margin: 22px 28px
}

.item-section {
  position: relative;
  width: 250px;
  height: 80px;
  text-align: left;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  font-weight: bold;
  margin: -5px 0 0 30px;
  color: #5B3E96;
}

.item-section-hour {
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
  margin: 25px 20px 0 0px;
  color: #5B3E96;
}

.slide-text {
  margin-top: 0px;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif;
}

.drag-delete {
  color: red;
  text-align: left;
  margin-left: 30px;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif
}

.drag-edit {
  color: #4ba5ff;
  text-align: right;
  margin: -22px 40px 0 0;
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif
}

@media only screen and (min-width: 360px) and (max-width: 450px) {
  .tasks-cards-daily {
    width: 90%;
    height: 75%;
  }

  .slide-item {
    width: 90%;
    height: 70px;
    border-radius: 5px;
    margin: 22px 15px
  }

  .drag-edit {
    color: #4ba5ff;
    text-align: right;
    margin: -22px 20px 0 0;
    font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif
  }

  .drag-delete {
    color: red;
    text-align: left;
    margin-left: 16px;
    font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif
  }

}

/*@media only screen and (min-width: 280px) and (max-width: 340px) {*/
/*  .drag-delete {*/
/*    font-size: 10px;*/
/*    margin: -10px 0 0 -120px;*/
/*  }*/

/*  .drag-edit {*/
/*    font-size: 10px;*/
/*    margin: -16px -130px 0 0*/
/*  }*/

/*  .daily-screen {*/
/*    width: 100%;*/
/*    height: 100%;*/
/*    display: flex;*/
/*    align-items: center;*/
/*    flex-direction: column;*/
/*  }*/

/*  .item-section {*/
/*    font-size: 12px;*/
/*    margin: -15px 0 0 20px;*/
/*  }*/

/*  .item-section-hour {*/
/*    font-size: 12px;*/
/*    margin-top: 15px;*/

/*  }*/
/*}*/
</style>
