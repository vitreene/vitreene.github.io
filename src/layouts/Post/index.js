import React, { PropTypes } from "react"

import TransitionPage from "../../components/TransitionPage"
import LatestPosts from "../../components/LatestPosts"
import Page from "../Page"
import styles from "./index.css"

const Post = (props) => {
  const {body, ...reste} = props;
  const {listPosts = true} = props.head;
  const [intro, texte] = (body) ? props.body.split('<!--intro-->') : '';
  return (
  <TransitionPage>
          <Page
              { ...reste } body={texte}
              header={ <Intro intro={intro}/> }
          >
            <hr />
            {listPosts && <LatestPosts />}
          </Page>
  </TransitionPage>
  )
}

Post.propTypes = {
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
}

export default Post


const Intro = (props) => (
        <div
            id="post-intro"
            className="post-intro"
            dangerouslySetInnerHTML={{__html: props.intro}}
        />
    )

Intro.propTypes = {
  intro: PropTypes.string,
}
