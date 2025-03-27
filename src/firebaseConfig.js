import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDlm8xWlY6uG0XC-rx5vkyBMw8F1AN2id8",
    authDomain: "workflow-matbook.firebaseapp.com",
    projectId: "workflow-matbook",
    storageBucket: "workflow-matbook.firebasestorage.app",
    messagingSenderId: "556082644351",
    appId: "1:556082644351:web:cd96f54d3e99e10d0b064a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);