<template>
  <section class="notes" v-if="this.notes.length > 0">
    <div
      class="notes-row"
      v-for="chunk in Math.ceil(notes.length / 6)"
      :key="'chunk-' + chunk"
    >
      <article
        class="note"
        v-for="(note, index) in notes.slice((chunk - 1) * 6, chunk * 6)"
        :key="'note-' + index"
        @click="toggleNoteModal(note)"
      >
        <p class="note-title" v-if="note.title">{{ note.title }}</p>
        <p class="note-text">{{ note.text }}</p>
      </article>
    </div>

    <transition name="bounce">
      <EditNote v-if="showNote" :note="activeNote" @close="toggleNoteModal" />
    </transition>
  </section>

  <transition name="fade" v-else>
    <div class="loaders">
      <span class="loader">
        <span class="inner-spinner"></span>
      </span>
    </div>
  </transition>
</template>

<script>
import EditNote from "./EditNote.vue";

export default {
  name: "AllNotes",
  props: ["notes"],
  components: {
    EditNote,
  },
  setup() {
    return {};
  },
  data() {
    return {
      showNote: false,
      activeNote: null,
    };
  },
  methods: {
    toggleNoteModal(note) {
      this.showNote = !this.showNote;

      if (this.showNote) {
        this.activeNote = note;
      } else {
        this.activeNote = null;
      }
    },
  },
};
</script>

<style>
section.notes {
  @apply w-full

    flex
    flex-col
    gap-4;
}

section.notes > .notes-row {
  @apply h-full
    w-full

    flex
    flex-col
    md:flex-row
    justify-center
    flex-wrap
    gap-4

    break-all
    md:break-words;
}

section.notes > .notes-row > .note {
  /* border:.1px solid red; */
  @apply bg-white
    drop-shadow
    rounded-md
    p-3
    flex-1
    max-w-prose;
}

.note > p.note-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @apply font-medium
    text-lg;
}

.note > p.note-title::after {
  content: "\a";
  white-space: pre;
}

.note > p.note-text {
  @apply font-light;
}
</style>
