// index.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword , signInWithEmailAndPassword ,signOut} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* === Firebase Setup === */
const firebaseConfig = {
  apiKey: "AIzaSyAylJkisQr4iCh6FT9sJd5Lv_s9uTAYx8o",
  authDomain: "foodie-71ccb.firebaseapp.com",
  projectId: "foodie-71ccb",
  storageBucket: "foodie-71ccb.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// console.log(app.options.projectId);
// console.log(auth);



/* === UI Elements === */
const viewLoggedOut = document.getElementById("logged-out-view");
const viewLoggedIn = document.getElementById("logged-in-view");

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn");
const emailInputEl = document.getElementById("email-input");
const passwordInputEl = document.getElementById("password-input");

const signInButtonEl = document.getElementById("sign-in-btn");
const createAccountButtonEl = document.getElementById("create-account-btn");

const signOutButtonEl = document.getElementById("sign-out-btn")

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle);
signInButtonEl.addEventListener("click", authSignInWithEmail);
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail);

signOutButtonEl.addEventListener("click", authSignOut)

showLoggedOutView();

/* === Functions === */

function authSignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      console.log("Signed in:", result.user);
      showLoggedInView();
    })
    .catch(error => {
      console.error("Google Sign-In Error:", error);
    });
}

function authSignInWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    clearAuthFields()
    showLoggedInView()
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage, errorCode)
  })
  console.log("Sign in with email and password");
}

function authCreateAccountWithEmail() {
const email = emailInputEl.value;
const password = passwordInputEl.value;   



createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    clearAuthFields()
    showLoggedInView()

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode,errorMessage);
    // ..
  });

  console.log("Create account with email and password");
}

function authSignOut(){
  signOut(auth).then(()=> {
    showLoggedOutView()
  }).catch((error)=>{
    console.error(error.message,error.code)
  });

}

function showLoggedOutView() {
  hideview(viewLoggedIn);
  showview(viewLoggedOut);
}

function showLoggedInView() {
  hideview(viewLoggedOut);
  showview(viewLoggedIn);
}

function showview(view) {
  element.style.display = "flex";
}

function hideview(view) {
  element.style.display = "none";
}

function clearInputField(field){
  field.value = ""
}

function clearAuthFields(){
  clearInputField(emailInputEl)
  clearInputField(passwordInputEl)
}
