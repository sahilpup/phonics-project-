// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDkn_LnXOyle656-65IEjf_B8Bgh4iVTBw",
  authDomain: "phonics-01.firebaseapp.com",
  projectId: "phonics-01",
  storageBucket: "phonics-01.appspot.com",  // ✅ fixed
  messagingSenderId: "209087528553",
  appId: "1:209087528553:web:8b271790613b5b99352cf8",
  measurementId: "G-QPXMT2NQ8Z"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 SIGN UP FUNCTION
window.signUp = async function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !contact || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save extra info in Firestore
    await setDoc(doc(db, "users", user.uid), { name, email, contact });

    alert("✅ Account created successfully!");
    window.location.href = "login.html";
  } catch (error) {
    console.error(error);
    alert("❌ " + error.message);
  }
};

// 🔹 SIGN IN FUNCTION
window.signIn = async function () {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password!");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert(`✅ Welcome back!`);
    window.location.href = "home.html"; // Redirect after login
  } catch (error) {
    console.error(error);
    alert("❌ " + error.message);
  }
};
async function testFirestoreConnection() {
  try {
    // Write a test document
    const docRef = await addDoc(collection(db, "testCollection"), {
      name: "Connection Test",
      time: new Date().toISOString()
    });
    console.log("✅ Test document written with ID:", docRef.id);

    // Read back documents
    const querySnapshot = await getDocs(collection(db, "testCollection"));
    querySnapshot.forEach((doc) => {
      console.log("📄 Document data:", doc.data());
    });

    alert("✅ Firestore connection successful! Check your console log.");
  } catch (error) {
    console.error("❌ Firestore connection failed:", error);
    alert("❌ Firestore connection failed. See console for details.");
  }
}

testFirestoreConnection();

