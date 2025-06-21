import React from "react"
import { AppContext, AppState } from "./context"

export function UseAppContext() {
  const context = React.useContext(AppContext)
  if (!context) throw Error('App context is undefined')
  return context
}

export function UseAppState() {
  const context = React.useContext(AppState)
  if (!context) throw Error('App state is undefined')
  return context
}
