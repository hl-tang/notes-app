<template>
    <!-- card -->
    <div class="w-full h-[225px] overflow-hidden flex flex-col justify-between rounded-xl shadow-2xl  hover:ring-2 ring-gray-500"
        :style="{ backgroundColor: backgroundColor }">
        <!-- delete button -->
        <div class="flex justify-end">
            <button class="p-1 rounded-full w-6 h-7 bg-gray-100 hover:bg-gray-300" @click="deleteNote(id)">
                <el-icon :size="15">
                    <Delete />
                </el-icon>
            </button>
        </div>
        <!-- main-text -->
        <div class="px-6 py-1">
            <el-scrollbar height="170px">
                <p class="text-gray-700 text-base font-semibold">
                    <!-- {{ note.text }} -->
                    {{ text }}
                </p>
            </el-scrollbar>
        </div>
        <!-- date 可以加.toLocaleDateString()-->
        <p class="date self-end pr-2">{{ date }}</p>
    </div>
</template>


<script setup>
import { defineProps, toRefs, ref } from "vue";

const props = defineProps({
    id: Number,
    text: String,
    date: String,
    backgroundColor: String,
})

const { id, text, date, backgroundColor } = toRefs(props);

const deleteNote = (noteId) => {
  const index = notes.value.findIndex(note => note.id === noteId);
  if (index !== -1) {
    notes.value.splice(index, 1);
  }
}
</script>


<style scoped>
.date {
  font-size: 14px;
  color: #999;
}
</style>