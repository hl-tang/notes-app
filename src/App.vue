<template>
  <div class="flex justify-between">
    <h1
      class="flex items-center text-5xl font-bold mb-5 mx-auto box-decoration-clone bg-gradient-to-r from-orange-600 to-blue-400">
      Notes</h1>
    <!-- dark mode -->
    <div class="flex items-center mr-5">
      <button @click="toggleDark()" class="mr-1">
        <!-- <i inline-block align-middle i="dark:carbon-moon carbon-sun" /> -->
        <span class="">{{ isDark ? 'Dark' : 'Light' }}</span>
      </button>
      <el-switch v-model="isDark" class="mt-2" style="--el-switch-on-color: #2F4F4F; --el-switch-off-color: #D3D3D3"
        inline-prompt :active-icon="Sunny" :inactive-icon="Moon" size="large" />
    </div>
  </div>

  <!-- 这样Notes会显示在左侧，不在中间，注意加mx-auto -->
  <!-- <div class="flex justify-between">
    <h1 class="flex justify-center items-center text-5xl font-bold mb-5">Notes</h1>
    <div class="flex justify-end mr-5">
      <button @click="toggleDark()" class="mr-1">
        <span class="">{{ isDark ? 'Dark' : 'Light' }}</span>
      </button>
      <el-switch v-model="isDark" class="mt-2" style="--el-switch-on-color: #2F4F4F; --el-switch-off-color: #D3D3D3"
        inline-prompt :active-icon="Sunny" :inactive-icon="Moon" size="large" />
    </div>
  </div> -->

  <!-- +按钮 -->
  <div class="flex justify-end mb-4 mr-5">
    <span class="pt-1 mr-2 font-sans text-lg">add notes:</span>
    <el-button size="large" circle color="teal" @click="isWriteNote = true">
      <el-icon :size="20">
        <Plus />
      </el-icon>
    </el-button>
  </div>


  <div v-show="isWriteNote" id="AuthOverlay"
    class="fixed flex justify-center items-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50">
    <div class="relative bg-white w-full max-w-[470px] h-[55%] p-4 rounded-lg">
      <div class="flex justify-end">
        <button class="p-1.5 rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-300" @click="isWriteNote = false">
          <el-icon :size="20">
            <CloseBold />
          </el-icon>
        </button>
      </div>

      <div class="mt-4">
        <textarea v-model="newNote" class="
          w-full
          bg-gray-100
          rounded-xl
          border-2 
          border-emerald-200
          ring ring-offset-2 ring-4 ring-cyan-500 
        " rows="14"></textarea>
      </div>

      <div class="p-4 mt-2 flex justify-end">
        <button @click="addNote" class="
          bg-teal-700 
          hover:bg-green-600 
          text-white 
          text-sm 
          font-bold 
          py-2 
          px-4 
          rounded-full
        ">
          Add note
        </button>
      </div>
      <!-- 这里不需要 newNote.value, value在script里用-->
      <p v-if="newNote.length === 0" class="text-pink-900">{{ errorMsg }}</p>

    </div>
  </div>


  <!-- <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card> -->

  <!-- {{ notes }} -->

  <!-- cards-container -->
  <!-- flex-wrap自动换行 -->
  <!-- 第一个card的垂直位置 和其他的不一样 ！！！ -->
  <div class="flex flex-wrap justify-start m-4 p-4 space-x-16 space-y-10">
    <!-- card -->
    <div v-for="note in notes" :key="note.id"
      class="w-1/5 h-[225px] overflow-hidden flex flex-col justify-between rounded-xl shadow-2xl  hover:ring-2 ring-gray-500"
      :style="{ backgroundColor: note.backgroundColor }">

      <div class="flex justify-end">
        <button class="p-1 rounded-full w-6 h-7 bg-gray-100 hover:bg-gray-300" @click="deleteNote(note.id)">
          <el-icon :size="15">
            <Delete />
          </el-icon>
        </button>
      </div>

      <div class="px-6 py-1">
        <el-scrollbar height="170px">
          <p class="text-gray-700 text-base font-semibold">
            {{ note.text }}
          </p>
        </el-scrollbar>
      </div>

      <p class="date self-end pr-2">{{ note.date }}</p>
    </div>

    <!-- 这里v-for class用了w-1/5，组件那里就改成w-full，不然变成1/5的1/5 -->
    <!-- <div v-for="note in notesStore.notes" :key="note.id" 
      class="w-1/5 h-[225px] overflow-hidden flex flex-col justify-between rounded-xl shadow-2xl  hover:ring-2 ring-gray-500"
    >
      <NoteCard 
        :id="note.id"
        :text="note.text"
        :date="note.date"
        :backgroundColor="note.backgroundColor"
      />
    </div> -->


  </div>
</template>


<script setup>
import { ref } from 'vue'
import NoteCard from "./components/NoteCard.vue";
import { useNotesStore } from './stores/notes'
// import { storeToRefs } from 'pinia'
const isWriteNote = ref(false)
// const currentDate = new Date()

import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
import { Sunny, Moon } from '@element-plus/icons-vue'

const newNote = ref("")
const notes = ref([]) //放在stores里，全局访问
const notesStore = useNotesStore()

const errorMsg = ref("")  //newNote不为空才能add

function getRandomLightColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}

// 硬要说bug的话，其实可以添加一个空note
const addNote = () => {
  if (newNote.value.length > 0) {
    (notes).value.push({
      id: Math.floor(Math.random() * 1000000),  //可以用uuid库
      text: newNote.value,
      date: new Date(),
      backgroundColor: getRandomLightColor()
    });
    isWriteNote.value = false;
    newNote.value = ""
    errorMsg.value = ""
  }
  else{
    return errorMsg.value = "New note shouldn't be empty"
  }
}

const deleteNote = (noteId) => {
  const index = notes.value.findIndex(note => note.id === noteId);
  if (index !== -1) {
    notes.value.splice(index, 1);
  }
};
</script>


<style scoped>
.date {
  font-size: 14px;
  color: #999;
}

/* .box-card {
  width: 480px;
  background-color: teal;
} */
</style>