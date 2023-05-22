import { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
// import './App.css'

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    console.log(auth?.currentUser?.email)

    // signin function
    const signIn = async () => {
        try { // catch the error
            await createUserWithEmailAndPassword(auth, email, password) //
        } catch (err) {
            console.error(err)
        }
    }
    

    const signInWithGoogle = async () => {
        try { // catch the error
            await signInWithPopup(auth, googleProvider) //
        } catch (err) {
            console.error(err)
        }
    }

    const logout = async () => {
        try { // catch the error
            await signOut(auth) //
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div className='auth-page'>
            <input type='email' placeholder="Email..." onChange={(e) => setEmail(e.target.value) } />
            <input type='password' placeholder="Password..." onChange={(e) => setPassword(e.target.value) } />
            <button onClick={signIn}>Sign-in</button>
            <button onClick={signInWithGoogle}>Sign-in with Google</button>
            <button onClick={logout}>sign-out</button>
        </div>
    )
}