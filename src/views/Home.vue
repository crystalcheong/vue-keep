<template>
  <header>
    <div class="logoArea">
      <img id="keep-icon" :src="keepIcon" alt="Keep" />
      <span>+</span>
      <img id="vue-icon" :src="vueIcon" alt="Vue" />
      <span>+</span>
      <img id="firebase-icon" :src="firebaseIcon" alt="Firebase" />
    </div>
    <AddNote />
  </header>
  <main>
    <AllNotes :notes="notes" />
  </main>
  <footer>
    <AddNote />
    <div class="footnotes">
      <a href="https://crystalcheong.com/">
        <p class="copyright">
          <span id="author">Crystal Cheong 🤘</span> {{ new Date().getFullYear() }}
        </p>
      </a>
      <a href="https://github.com/crystalcheong">
        <img :src="githubIcon" alt="Github" />
      </a>
    </div>
  </footer>
</template>

<script>
import { Note } from "../models";
import { NotesData } from "../data";
import { query, onSnapshot } from "firebase/firestore";

import AllNotes from "../components/notes/AllNotes.vue";
import AddNote from "../components/notes/AddNote.vue";

import keepIcon from "../assets/keep-logo.png";
import vueIcon from "../assets/vue-logo.png";
import firebaseIcon from "../assets/firebase-logo.png";
import githubIcon from "../assets/icons/github.svg";

export default {
  name: "Home",
  components: {
    AllNotes,
    AddNote,
  },
  setup() {
    return {
      keepIcon,
      vueIcon,
      firebaseIcon,
      githubIcon,
    };
  },
  data() {
    return {
      notes: [],
      noteSubscription: null,
    };
  },
  created() {
    this.noteSubscription = onSnapshot(
      query(NotesData.collectionRef),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          var id = change.doc.id;
          var data = change.doc.data();
          var title = data.title;
          var text = data.text;

          if (change.type === "added") {
            this.notes.push(new Note(id, title, text));
          }
          if (change.type === "modified") {
            var noteIndex = this.notes.map(e => e.id).indexOf(id)
            this.notes[noteIndex].title = title
            this.notes[noteIndex].text = text
          }
          if (change.type === "removed") {
            // console.info("Removed city: ", change.doc.data());

            var noteIndex = this.notes.map(e => e.id).indexOf(id)
            this.notes.splice(noteIndex, 1);
          }
        });
      }
    );
  },
  beforeUnmount() {
    this.noteSubscription();
  },
};
</script>

<style>
header {
  @apply flex
    flex-col
    content-center
    items-center
    md:gap-y-4
    py-6;
}

header > .logoArea {
  /* border: 0.1px solid purple; */
  @apply flex
    flex-row
    justify-center
    content-center
    items-center
    gap-x-4;
}

header > .logoArea > img {
  @apply h-8;
}

header > form#note-form {
  @apply hidden
    md:flex;
}

footer > form#note-form {
  @apply flex
    md:hidden;
}

main {
  @apply flex-1
    overflow-y-scroll;
}

footer {
  @apply 
    pt-3
    flex
    flex-col
    md:flex-col-reverse
    justify-between
    content-center
    items-center
    gap-y-8;
}

footer > .footnotes {
  @apply w-full
    py-2

    self-start
    flex
    flex-row-reverse
    justify-between
    items-center

    text-sm
    tracking-wide
    font-light
    text-gray-600;
}

.footnotes img {
  @apply h-5;
}

#author{
  @apply
    hidden
    md:inline
}
</style>
