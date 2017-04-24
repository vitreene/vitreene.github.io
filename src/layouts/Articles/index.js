import React, { PropTypes } from "react"

import LatestPosts from "../../components/LatestPosts"
import Page from "../Page"

// import styles from "./index.css"


const Articles = (props) => {
  // it's up to you to choose what to do with this layout ;)
  // const pageDate = props.head.date ? new Date(props.head.date) : null;
  const {body, ...reste} = props;
  const [intro, texte] = (body) ? props.body.split('<!--intro-->') : '';

  return (
    <Page
        { ...reste } body={texte}
        header={ <Intro intro={intro}/> }
    >
      <hr />
      <LatestPosts />
    </Page>
  )
}

Articles.propTypes = {
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
}

export default Articles

const Intro = (props) => {
    return (
        <div
            id="post-intro"
            className="post-intro"
            dangerouslySetInnerHTML={{__html: props.intro}}
        />
    )
}

Intro.propTypes = {
  intro: PropTypes.string,
}
