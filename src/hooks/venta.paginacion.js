import { useState } from "react"

export const usePagination = (initialPagination = {}) => {

  const [paginationState, setPaginationState] = useState(initialPagination)

  const handleDate = ({target}) => {
    const fecha = new Date(target.value).toISOString().split('T')[0]
    const { name } = target
    setPaginationState({
      ...paginationState,
      [name]: fecha
    })
  }

  const onDropdownChange = ({target}) => {
    const { name, value } = target
    setPaginationState({
      ...paginationState,
      [name]: value
    })
  }

  return{
    paginationState,
    handleDate,
    onDropdownChange
  }

}