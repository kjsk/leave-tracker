import React, { Fragment } from "react"
import Login from './Login'
import SEO from "../components/seo"


const IndexPage = () => {

  return (
    <Fragment>
      <SEO title="Login" description="Gatsby is a React-based open source framework with performance, scalability and security built-in." keywords={['gatsby', 'react']} />
      <Login />
    </Fragment>
  )
}

export default IndexPage
