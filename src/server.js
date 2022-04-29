import React from "react";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOkPmEU4-1zO6FBuzlxpP-8CBt6koTx7M",
  authDomain: "fir-9-tutorial-79ffe.firebaseapp.com",
  projectId: "fir-9-tutorial-79ffe",
  storageBucket: "fir-9-tutorial-79ffe.appspot.com",
  messagingSenderId: "48439156503",
  appId: "1:48439156503:web:e091e7c3853fc3decce152",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, "books");

// queries
const q = query(
  colRef,
  /* where("author", "==", "Ricardo"), */ orderBy("createdAt")
);

// get collection data

const Server = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [updateId, setUpdateId] = useState("");

  /* getDocs(colRef)
    .then((snapshot) => {
      let books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((err) => {
      console.log(err.message);
    }); */

  // CONSOLE LOG BOOKS
  onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  });

  // CREATE BOOK
  const addBookForm = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      title: title,
      author: author,
      createdAt: serverTimestamp(),
    }).then(() => {
      document.querySelector(".add").reset();
    });
  };

  // DELETE BOOK
  const deleteBookForm = (e) => {
    e.preventDefault();

    const docRef = doc(db, "books", deleteId);

    deleteDoc(docRef).then(() => {
      document.querySelector(".delete").reset();
    });
  };

  // GET BOOK BY ID
  const docRef = doc(db, "books", "N3h4kWQtIemtF00Iyg9m");

  getDoc(docRef).then((doc) => {
    console.log(doc.data(), doc.id);
  });

  //UPDATE BOOK
  const updateForm = (e) => {
    e.preventDefault();

    const docRefr = doc(db, "books", updateId);
    updateDoc(docRefr, {
      title: "updated title",
    }).then(() => {
      document.querySelector(".update").reset();
    });
  };

  return (
    <div>
      <h1>Server</h1>
      <form className="add" onSubmit={addBookForm}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <button>Add a new book</button>
      </form>
      <form className="delete" onSubmit={deleteBookForm}>
        <label htmlFor="id">Document id:</label>
        <input
          type="text"
          name="id"
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button>Delete a book</button>
      </form>
      <form className="update" onSubmit={updateForm}>
        <label htmlFor="id">Document id:</label>
        <input
          type="text"
          name="id"
          onChange={(e) => setUpdateId(e.target.value)}
        />
        <button>Update a book</button>
      </form>
    </div>
  );
};

export default Server;
