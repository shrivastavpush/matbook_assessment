import React from 'react'
import { auth } from "./firebaseConfig";

console.log("Firebase Auth instance:", auth);

const App = () => {
  return (
    <div className='text-2xl'>App
    </div>
  )
}

export default App