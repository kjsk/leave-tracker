import React, { Fragment } from "react"

import SEO from "../components/seo"

const NotFoundPage = () => (
  <Fragment>
    <SEO title="404: Not found" />
    <div style={{ width: `100%`, height: `100vh` }}>
      <iframe
        title="404"
        src="https://embed.lottiefiles.com/animation/43391"
        style={{ width: `100%`, height: `100%` }}
      ></iframe>
    </div>
  </Fragment>
)

export default NotFoundPage
