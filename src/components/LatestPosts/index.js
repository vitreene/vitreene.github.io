import React, { PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import PagesList from "../../components/PagesList"

// import styles from "./index.css"

const defaultNumberOfPosts = 20


const LatestPosts = (props, { collection }) => {
  const {
    current__url = '',
    cat = 'articles',
  } = props;
  const latestPosts = enhanceCollection(collection, {
    filter: { collection: cat },
    sort: "date",
    reverse: true,
  })
  .slice(0, props.numberOfPosts || defaultNumberOfPosts)
  .filter( post => post.__url != current__url );

  return (
        <PagesList pages={ latestPosts } cat={ cat } />
  )
}

LatestPosts.propTypes = {
  numberOfPosts: PropTypes.number,
  current__url: PropTypes.string,
  cat: PropTypes.string
}

LatestPosts.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default LatestPosts
