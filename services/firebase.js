import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBezZEDKxzny_BMq8kKgMW1pfaVMbpG30",
  authDomain: "projetooretorno-4688b.firebaseapp.com",
  projectId: "projetooretorno-4688b",
  storageBucket: "projetooretorno-4688b.appspot.com",
  messagingSenderId: "976609646777",
  appId: "1:976609646777:web:29fd1113ad9f73f3782368",
  measurementId: "G-DEJTS78P16",
  databaseURL: "https://projetooretorno-4688b-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export default app;