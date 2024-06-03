"use client"

// Navbar.js
import Link from "next/link"
import styles from "./Navbar.module.css"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()

  const routes = [
    { name: "Profile", href: "/profile" },
    { name: "Friends", href: "/friends" },
    { name: "Messages", href: "/messages" },
    { name: "Groups", href: "/groups" },
   // { name: "News", href: "/news" },
    { name: "Settings", href: "/settings" },
  ]

  return (
    <div className={styles.Navbar}>
      {routes.map((route) => {
        return (
          <ul key={route.name}>
            <li>
              <Link
                href={route.href}
                className={
                  pathname === route.href ? styles.active : styles.link
                }
              >
                {route.name}
              </Link>
            </li>
          </ul>
        )
      })}
    </div>
  )
}
