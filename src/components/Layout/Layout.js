import React from 'react'
import Category from '../categories/Category'
import Routes from '../../Routes'
export default function Layout() {
  return (
    <React.Fragment>
      <Category />
      <Routes />
    </React.Fragment>
  )
}
