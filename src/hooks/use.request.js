import { useState } from "react"

export const useRequest = (initialRequest = {}) => {

  const [requestState, setRequestState] = useState(initialRequest)

  const onInputChange = ({target}) => {
    const { name, value } = target
    setRequestState({
      ...requestState,
      [name]: value
    })
  }

  const onDropdownChange = ({target}) => {
    const { name, value } = target
    setRequestState({
      ...requestState,
      [name]: value
    })
  }

  return{
    requestState,
    onInputChange,
    onDropdownChange
  }

}