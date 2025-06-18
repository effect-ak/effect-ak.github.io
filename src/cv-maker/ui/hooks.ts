import React from "react"
import { AppContext } from "./context"

export function UseAppContext() {
  const context = React.useContext(AppContext)
  if (!context) throw Error('App context is undefined')
  return context
}