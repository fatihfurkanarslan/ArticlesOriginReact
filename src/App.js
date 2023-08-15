import React, { Component } from 'react'
import Navbar from './components/navbar/Navbar'
import Layout from './components/Layout/Layout'
import { withRouter } from 'react-router-dom';


class App extends Component {
  render() {



    return (
      <div className='w-[80%] mx-auto my-0'>
        <Navbar />
        <Layout />

      </div>
    )
  }
}
export default withRouter(App)