<template>
  <section class="backdrop" @click.self="closeNoteModal">
    <div id="note-modal-form" @submit.prevent="null" v-if="note">
      <input
        type="text"
        name="note-title"
        id="note-modal-title"
        placeholder="Title"
        v-model="noteTitle"
        v-if="noteText.length > 0 || noteTitle.length > 0"
      />
      <textarea
        name="note-text"
        id="note-modal-text"
        placeholder="Take a note. . ."
        v-model="noteText"
      />

      <div class="note-modal-options">
        <div class="options-icons">
          <button @click="deleteNote"><TrashIcon /></button>
        </div>
        <p class="close-note-modal" @click="closeNoteModal">Close</p>
      </div>
    </div>

    <div class="loaders" v-else>
      <span class="loader">
        <span class="inner-spinner"></span>
      </span>
    </div>
  </section>
</template>

<script>
import { NotesData } from "../../data";

import { TrashIcon } from "@heroicons/vue/outline";

export default {
  name: "EditNote",
  props: ["note"],
  components: {
    TrashIcon,
  },
  data() {
    return {
      noteTitle: this.note.title,
      noteText: this.note.text,
    };
  },
  methods: {
    deleteNote() {
      NotesData.deleteNote(this.note.id);

      this.$emit("close");
    },
    closeNoteModal() {
      var currentNote = {
        id: this.note.id,
        title: this.noteTitle.trim(),
        text: this.noteText.trim(),
      };

      if (
        this.note.title != currentNote.title ||
        this.note.text != currentNote.text
      ) {
        NotesData.updateNote(this.note.id, currentNote.title, currentNote.text);
      }
      this.$emit("close");
    },
  },
};
</script>

<style>
.backdrop {
  @apply h-screen
        w-screen

        backdrop-filter 
        backdrop-blur 
        bg-transparent

        fixed
        inset-0
        z-50

        flex
        flex-col
        justify-center
        content-center
        items-center;
}

#note-modal-form {
  /* border: 0.1px solid red; */
  @apply w-4/6
        h-3/6
        py-6
        rounded-3xl

        flex
        flex-col
        justify-start
        content-center
        items-center
        gap-y-4

        bg-gray-100;
}

#note-modal-form > * {
  /* border: 0.1px solid red; */
  @apply w-11/12;
}

#note-modal-form > input,
#note-modal-form > textarea {
  resize: none;
  background: transparent;
  @apply p-4;
}

#note-modal-form > #note-modal-title {
  @apply font-medium
    text-lg
    flex-none
    overflow-y-scroll
    max-h-8;
}

#note-modal-form > #note-modal-text {
  @apply bg-transparent
    flex-1
    font-light
    overflow-y-scroll;
}

#note-modal-form > .note-modal-options {
  @apply flex
    flex-row
    justify-between
    content-center
    items-center;
}

#note-modal-form > .note-modal-options > .options-icons {
  @apply flex
        flex-row
        justify-start
        content-center
        items-center
        gap-x-4;
}

.options-icons > * {
  /* border:.1px solid red; */
  @apply p-1;
}

.note-modal-options > .options-icons svg {
  @apply h-6
        text-gray-600;
}
</style>
