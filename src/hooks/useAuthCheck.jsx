// import {useAuth0} from '@auth0/auth0-react'
import { toast } from "react-toastify";


const useAuthCheck = () => {

  const isAuthenticated = localStorage.getItem("token") == "null" ? true : false;
  console.log(localStorage.getItem("token"));
  const validateLogin = () => {
      console.log("Validate login called");
    if (!isAuthenticated) {
      console.log("Not authenticated");
      toast.error("you must be logged in", { position: "bottom-right" })
      return false
    } else {
      console.log("Authenticated");
      return true
    }
    }
  return (
    {
      validateLogin
    }
  )
}

export default useAuthCheck