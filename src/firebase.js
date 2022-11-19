import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyBcysMawq9IcIavwqfFhrh-GxhbJZPY6ys',
  authDomain: 'blood-donation-8e1f2.firebaseapp.com',
  projectId: 'blood-donation-8e1f2',
  storageBucket: 'blood-donation-8e1f2.appspot.com',
  messagingSenderId: '780644497297',
  appId: '1:780644497297:web:3e5d2f79d397be1b854c30',
  measurementId: 'G-1S8W0VCS18',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
