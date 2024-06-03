import InputComponent from "@/components/Input/InputComponent"
import GroupBlock, { GroupType } from "./GroupBlock"
import { useEffect, useState } from "react"
import { getAllGroups } from "@/actions/groups/getAllGroups"
import styles from "./GroupSearch.module.css"
import { debounce } from "@/components/Input/inputHelpers"

export default function GroupSearch() {
  const [groups, setGroups] = useState<GroupType[]>([])
  const [initialGroupsArr, setInitialGroupsArr] = useState<GroupType[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    async function getGroupsData() {
      const groups = await getAllGroups()
      if (groups) {
        setGroups(groups)
      }
    }
    getGroupsData()
  }, [])

  //search

  const handleSearch = debounce((params: string) => {
    setSearchTerm(params)
    if (params) {
      const lowerCaseParams = params.toLowerCase().trim()
      const newArr = groups.filter((group) =>
        group.group_name.toLowerCase().includes(lowerCaseParams)
      )
      setGroups(newArr)
    } else {
      setGroups(initialGroupsArr)
    }
  }, 300)

  return (
    <div>
      <div>
        <InputComponent sortHandler={handleSearch} />
      </div>
      <div>
        {groups &&
          groups.map((group) => {
            return (
              <GroupBlock
                key={group.GroupID}
                GroupID={group.GroupID}
                group_name={group.group_name}
                groups={groups}
                setGroups={setGroups}
                CreatorID={group.CreatorID}
              />
            )
          })}

        {groups.length < 1 && (
          <div className={styles.noGroups}>There is no more groups</div>
        )}
      </div>
    </div>
  )
}
