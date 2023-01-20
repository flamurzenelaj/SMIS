import React from "react"
import { Route } from "react-router-dom"
// import { useAuthContext } from "../lib/context/AuthContext/AuthContext"

const RestrictedRoute = (props) => {
  // const authCtx = useAuthContext()

  // if (authCtx.isAuthenticated) {
  //   return <Redirect to="/" />
  // }
  return <Route {...props} />
}

export default RestrictedRoute;