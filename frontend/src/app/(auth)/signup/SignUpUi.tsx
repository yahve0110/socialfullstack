"use client"

import React, { useState, ChangeEvent, FormEvent } from "react"
import styles from "./SignUp.module.css"
import Image from "next/image"
import Link from "next/link"
import ImageUploader from "./imageUploader"
import { signUp } from "@/actions/auth/signUp"
import { useRouter } from "next/navigation"

export interface FormData {
  first_name: string
  last_name: string
  email: string
  username: string
  password: string
  confirmPassword: string
  birth_date: string
  gender: string
  profilePicture: string
  about: string
}

export const SignUpUi: React.FC = () => {
  //state for input forms
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    birth_date: "",
    gender: "Male",
    profilePicture: "",
    about: "",
  })
  const router = useRouter()

  //state for error message
  const [error, setError] = useState("")

  //state for user avatar
  const [avatar, setAvatar] = useState("")

  //state for password errors
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  //on form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordMatch(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false)
      return
    }
    formData.profilePicture = avatar

    try {
      const response = await signUp(formData)
      if (response !== "success" && response !== undefined) {
        setError(response)
      } else if (response === "success" && response !== undefined) {

        router.push("/signin")
      } else {
        setError("unknown error")
      }
    } catch (error) {
      console.error("Error signing up:", error)
    }
  }

  const deleteImg = (e: React.MouseEvent) => {
    e.preventDefault()
    setAvatar("") // Assuming setting avatar to an empty string removes the avatar
  }

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.loginForm}>
        <h2>Sign Up</h2>
        <div className={styles.underline}></div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputsContainer}>
            <input
              type="text"
              minLength={3}
              maxLength={15}
              required
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder={"First Name *"}
            />
            <input
              type="text"
              minLength={3}
              maxLength={15}
              required
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder={"Last Name *"}
            />
            <input
              type="email"
              minLength={3}
              maxLength={25}
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={"Email *"}
            />
            <input
              type="text"
              required
              name="username"
              minLength={3}
              maxLength={15}
              value={formData.username}
              onChange={handleChange}
              placeholder={"Nickname *"}
              autoComplete="off"
            />
            <input
              type="password"
              required
              minLength={6}
              maxLength={25}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={"Password *"}
              autoComplete="off"
            />
            <input
              type="password"
              minLength={6}
              maxLength={25}
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={"Confirm Password *"}
            />
            <div>
              <label htmlFor="birth_date">Your birth day *</label>
              <input
                required
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                placeholder={"BirthDate"}
              />
            </div>

            <div className={styles.selectWrapper}>
              <label htmlFor="gender">Your gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={styles.Select}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.imgDiv}>
              {avatar ? (
                <Image
                  src={avatar}
                  alt="avatar"
                  width={100}
                  height={100}
                  className={styles.selectedImg}
                />
              ) : (
                <Image
                  className={styles.selectedImg}
                  src="/assets/imgs/avatar.png"
                  alt="avatar"
                  width={130}
                  height={100}
                />
              )}
              {avatar && (
                <Image
                  src={"/assets/icons/delete.svg"}
                  alt="delete"
                  width={20}
                  height={20}
                  className={styles.removeImgBtn}
                  onClick={(e) => deleteImg(e)}
                />
              )}
            </div>
            <ImageUploader avatar={avatar} setAvatar={setAvatar} />
          </div>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder={"Write about you"}
            className={styles.aboutTextarea}
          />
          {!passwordMatch && (
            <div className={styles.passwordErrorDiv}>{`Passwords don't match`}</div>
          )}
          {error && <div className={styles.errorDiv}>{error}</div>}
          <button type="submit" className={styles.signUpBtn}>
            Sign up
          </button>
          <div className={styles.linkdiv}>
            <p>Have account ?</p>
            <Link href="/signin">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
