import React, { PropTypes } from "react"
import Helmet from "react-helmet"
// import warning from "warning"
import { BodyContainer, joinUri /*, Link */} from "phenomic"

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// import Button from "../../components/Button"
import Loading from "../../components/Loading"

import styles from "./index.css"

const Page = (
  {
    isLoading,
    __filename,
    __url,
    head,
    body,
    header,
    footer,
    children,
  },
  {
    metadata: { pkg },
  }
) => {
  // warning(
  //   typeof head.title === "string",
  //   `Your page '${ __filename }' needs a title`
  // )
  const {titleStyle = 'heading'} = head;
  const metaTitle = head.metaTitle ? head.metaTitle : head.title

  const socialImage = head.hero && head.hero.match("://") ? head.hero
    : joinUri(process.env.PHENOMIC_USER_URL, head.hero)

  const meta = [
    { property: "og:type", content: "article" },
    { property: "og:title", content: metaTitle },
    {
      property: "og:url",
      content: joinUri(process.env.PHENOMIC_USER_URL, __url),
    },
    { property: "og:image", content: socialImage },
    { property: "og:description", content: head.description },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: metaTitle },
    { name: "twitter:creator", content: `@${ pkg.twitter }` },
    { name: "twitter:description", content: head.description },
    { name: "twitter:image", content: socialImage },
    { name: "description", content: head.description },
];
const script = (head.js) &&
    head.js
    .map( j => require('../../js/' + j+'.js') )
    .map( s => s.default() );

  // console.log('head', head);
  // console.log('script', head.js, script);
  return (
  <div className={ styles.page } key={head.title} >
              <Helmet
                  title={ metaTitle }
                  meta={ meta }
              />
              { head.title && (
                  <div className={ styles.header }>
                     <h1 className={ styles[titleStyle] }>{ head.title }</h1>
                  </div>
              )}
              <div className={ styles.wrapper + " " + styles.pageContent }>
                  { header }
                 { body &&
                  <div className={ styles.body }>
                      {
                          isLoading
                              ? <Loading />
                          : <BodyContainer>{ body }</BodyContainer>
                      }
                  </div>
                  }
                  { children }
                  { footer }
                  { script }
              </div>
          </div>

  )
}

Page.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
}

Page.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Page
