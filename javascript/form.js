import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_fcBYUgy8E7u6j-zp_wbaRzH3TBQZ04w",
  authDomain: "program-of-work-stage.firebaseapp.com",
  projectId: "program-of-work-stage",
  storageBucket: "program-of-work-stage.appspot.com",
  messagingSenderId: "541617325107",
  appId: "1:541617325107:web:213eb242c362f2c53a8f46"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("form");
  const params = new URLSearchParams(window.location.search);
  const docId = params.get("id");

  // shoe current info when updating
  if (docId) {
    const docRef = doc(db, "powRecords", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const inputs = form.querySelectorAll("input, textarea, select");

      inputs.forEach(input => {
        const name = input.getAttribute("name");
        if (name && data[name] !== undefined) {
          input.value = data[name];
        }
      });
    }
  }

  //Save form part
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea, select");
    const data = {};

    inputs.forEach(input => {
      const name = input.getAttribute("name");
      if (name) {
        data[name] = input.value.trim();
      }
    });

    try {
      if (docId) {
        await setDoc(doc(db, "powRecords", docId), data);
        alert("Record updated successfully.");
        window.location.href = "/HTML/report.html";
      } else {
        const counterRef = doc(db, "meta", "powCounter");
        const counterSnap = await getDoc(counterRef);

        if (!counterSnap.exists()) {
          alert("Counter document not found.");
          return;
        }

        const currentCount = counterSnap.data().current;
        const newId = (currentCount + 1).toString();

        await setDoc(doc(db, "powRecords", newId), data);
        await updateDoc(counterRef, { current: currentCount + 1 });

        alert("Form submitted! Document written with ID: " + newId);
        form.reset();
        window.location.href = "/Auth&Firebase/dashboard.html"; 
      }
    } catch (error) {
      console.error("Error adding/updating document: ", error);
      alert("Failed to submit.");
    }
  });
});
