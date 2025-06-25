import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Reuse your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDZufahZb7Z55G3Mlum3hxnS7D5h46LzHk",
  authDomain: "cbao-a92af.firebaseapp.com",
  projectId: "cbao-a92af",
  storageBucket: "cbao-a92af.firebasestorage.app",
  messagingSenderId: "53148459439",
  appId: "1:53148459439:web:d5c076d4ebeceac62b0f5a",
  measurementId: "G-48MB2Q0Q0R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check auth state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Fill in HTML elements
      document.getElementById("employee-name").textContent = `${data.firstName} ${data.lastName}`;
      document.getElementById("employee-id").textContent = data.employeeId;
      document.getElementById("employee-email").textContent = data.email;
    } else {
      console.error("No user data found");
    }
  } else {
    // Redirect to login if not signed in
    window.location.href = "login.html";
  }
});
