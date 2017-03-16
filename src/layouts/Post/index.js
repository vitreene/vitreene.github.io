import React, { PropTypes } from "react"

import LatestPosts from "../../components/LatestPosts"
import Page from "../Page"

import styles from "./index.css"

// import HeroVideoStop from '../../components-posts/HeroVideoStop'

const Post = (props) => {
    // HeroVideoStop();
  // it's up to you to choose what to do with this layout ;)
  const pageDate = props.head.date ? new Date(props.head.date) : null;
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

Post.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Post


const Intro = (props) => {

    return (

        <div
            id="post-intro"
            className="post-intro"
            dangerouslySetInnerHTML={{__html: props.intro}}
        />
    )
}
