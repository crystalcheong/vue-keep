import { db } from "../services";
import { Note } from "../models";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

const collectionName = "notes";
export const collectionRef = collection(db, collectionName);

export async function getNotes() {
  const snapshot = await getDocs(collectionRef);

  const notes = snapshot.docs.map((doc) => {
    var data = doc.data();
    var id = doc.id;
    var title = doc.data().title;
    var text = doc.data().text;

    return new Note(id, title, text);
  });

  // console.log(notes);
  return notes;
}

export async function addNote(title, text) {
  const note = {
    title: title.trim(),
    text: text.trim(),
  };
  const docRef = await addDoc(collectionRef, note)
    .then((doc) => console.info(`SUCCESS - Note created [${doc.id}]`))
    .catch((err) => console.error(`ERROR - Note not created [${err.message}]`));
}

export async function updateNote(id, title, text) {
  const note = {
    title: title.trim(),
    text: text.trim(),
  };
  const noteRef = doc(db, collectionName, id);

  const docRef = await updateDoc(noteRef, note)
    .then((doc) => console.info(`SUCCESS - Note updated [${doc.id}]`))
    .catch((err) => console.error(err.message));
}

export async function deleteNote(id){
    await deleteDoc(doc(db, collectionName, id))
    .then(() => console.info(`SUCCESS - Note deleted [${id}]`))
    .catch((err) => console.error(err.message));
}