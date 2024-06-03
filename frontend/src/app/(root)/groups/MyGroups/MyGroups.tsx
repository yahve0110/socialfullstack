import InputComponent from "@/components/Input/InputComponent"
import MyGroup from "./MyGroup"
import { useEffect, useState } from "react"
import { getMyGroups } from "@/actions/groups/getMyGroups"
import styles from "./ MyGroups.module.css"
import { debounce } from "@/components/Input/inputHelpers"

export type MyGroupProps = {
  key: string
  GroupID: string
  group_name: string
}

export default function MyGroups() {
  const [groupsArr, setGroupsArr] = useState<MyGroupProps[]>([])
  const [initialGroupsArr, setInitialGroupsArr] = useState<MyGroupProps[]>([])

  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    async function getGroups() {
      try {
        const myGroups = await getMyGroups()
        setGroupsArr(myGroups)
        setInitialGroupsArr(myGroups)
      } catch (error) {
        console.error("Error fetching user's groups:", error)
      }
    }
    getGroups()
  }, [])

  //search

  const handleSearch = debounce((params: string) => {
    setSearchTerm(params)
    if (params) {
      const lowerCaseParams = params.toLowerCase().trim()
      const newArr = groupsArr.filter((group) =>
        group.group_name.toLowerCase().includes(lowerCaseParams)
      )
      setGroupsArr(newArr)
    } else {
      setGroupsArr(initialGroupsArr)
    }
  }, 300)

  return (
    <div>
      <div>
        <InputComponent sortHandler={handleSearch} />
      </div>
      <div>
        {groupsArr &&
          groupsArr.length > 0 &&
          groupsArr.map((el) => (
            <MyGroup
              key={el.GroupID}
              group_id={el.GroupID}
              group_name={el.group_name}
            />
          ))}
        {!groupsArr && (
          <div className={styles.noGroups}>
            You are not belong to any group{" "}
          </div>
        )}
      </div>
    </div>
  )
}
