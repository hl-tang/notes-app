import { defineStore } from 'pinia'
import { ref } from "vue"

export const useNotesStore = defineStore('notes', () => {
    const notes = ref([])

    return { notes }
})