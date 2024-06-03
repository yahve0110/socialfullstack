"use client"

import styles from "./SignIn.module.css"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "@/actions/auth/login"

export const SignInUi = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [unauthorized, setUnauthorized] = useState(false)
  const [serverError, setServerError] = useState(false)

  const router = useRouter()
  const sendData = async () => {
    setUnauthorized(false)
    setServerError(false)

    const response = await signIn(username, password)
    console.log(response)
    if (response.message === "Login successful") {
      router.push(`/profile`)
    } else if (response === "Unauthorized") {
      setUnauthorized(true)
    } else {
      setServerError(true)
    }
  }

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.loginForm}>
        <h2>Sign In</h2>
        <div className={styles.underline}></div>
        <input
          type="text"
          placeholder="nickname/email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {unauthorized && (
          <div className={styles.invalidCredentialsError}>
            Invalid Credentials
          </div>
        )}
        {serverError && (
          <div className={styles.invalidCredentialsError}>
            Server error try again later
          </div>
        )}

        <button className={styles.loginBtn} onClick={sendData}>
          Log In
        </button>
        <div className={styles.linkDiv}>
          <p>No account ?</p>
          <Link href={"/signup"}>Sign up</Link>
        </div>
      </div>
    </div>
  )
}
