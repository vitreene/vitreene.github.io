import React, { PropTypes } from "react"

import styles from "./index.css"

const Content = (props, context) => {
    const portfolio = (context.isPortfolio) ? styles.portfolio : '';
    return (
      <div className={ styles.content, portfolio }>
          { props.children }
      </div>
    )
}

Content.propTypes = {
    children: PropTypes.node,
}

Content.contextTypes = {
    isPortfolio: PropTypes.bool,
}

export default Content
