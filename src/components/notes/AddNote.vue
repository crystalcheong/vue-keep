<template>
  <form id="note-form" @submit.prevent="createNote">
    <input
      type="text"
      name="note-title"
      id="note-title"
      placeholder="Title"
      v-model="noteTitle"
      v-if="noteText.length > 0 || noteTitle.length > 0"
    />
    <textarea
      name="note-input"
      id="note-text"
      placeholder="Take a note. . ."
      v-model="noteText"
      v-on:keyup.ctrl.enter="createNote"
    />
    <button type="submit"><span>+</span></button>
  </form>
</template>

<script>
import { NotesData } from "../../data";

export default {
  name: "NoteForm",
  data() {
    return {
      noteTitle: "",
      noteText: "",
    };
  },
  methods: {
    async createNote() {
      if (this.noteText.trim().length > 0) {
        var note = {
          title: this.noteTitle.trim(),
          text: this.noteText.trim(),
        };

        // console.log(note);
        NotesData.addNote(note.title, note.text)

        this.noteTitle = this.noteText = ""
      }
    },
  },
};
</script>

<style>
form#note-form {
  /* border: 0.1px solid green; */
  @apply w-3/5
    max-w-md
    p-3

    relative
    flex 
    flex-col 
    justify-center
    content-center
    gap-1.5

    bg-white
    drop-shadow-lg
    rounded-lg;
}

form#note-form > input,
form#note-form > textarea {
  /* border: 0.1px solid red; */
  resize: none;
  background: transparent;
  flex: 1;
}

form#note-form > button[type="submit"] {
  @apply w-10
    h-10
    rounded-full

    text-center
    text-lg
    text-gray-50
    font-semibold
    bg-green-400

    self-end
    absolute
    -bottom-6
    right-2.5;
}
</style>
