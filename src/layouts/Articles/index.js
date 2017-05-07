// import React, { PropTypes } from "react"
import React from "react"

import Page from "../Page"
import LatestPosts from "../../components/LatestPosts"
import TransitionPage from "../../components/TransitionPage"
// import Page from "../Page"

// import styles from "./index.css"

const Articles = (props) => (
  <TransitionPage>
             <Page { ...props }>
    <LatestPosts />
           </Page>
  </TransitionPage>
)

/*
const Articles = (props) => {
  // it's up to you to choose what to do with this layout ;)
  // const pageDate = props.head.date ? new Date(props.head.date) : null;
  // const {body, ...reste} = props;
  // const [intro, texte] = (body) ? props.body.split('<!--intro-->') : '';

  return (
      <Page { ...props} >
        <LatestPosts />
        </Page>
  )
}

Articles.propTypes = {
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
}
*/
export default Articles

