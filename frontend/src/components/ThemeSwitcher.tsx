"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import styles from "./ThemeSwitch.module.css"
import Image from "next/image"

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  let { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }



  return (
    <>
      {theme === "light" ? (
        <div className={styles.sunMoonDiv}></div>
      ) : (
        <div className={styles.moonDiv}></div>
      )}
      <div className={styles.swithcDiv}>
        <label className={styles.switchLabel}>
          <input
            type="checkbox"
            className={styles.switchBox}
            onChange={toggleTheme}
          />
          <span
            className={`${styles.slider} ${
              theme === "light" ? styles.light : styles.dark
            }`}
          >
            <Image
              className={styles.icon}
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
            />
            <Image
              className={`${styles.icon} ${styles.moon}`}
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
            />
          </span>
        </label>
      </div>
    </>
  )
}

export default ThemeSwitch
