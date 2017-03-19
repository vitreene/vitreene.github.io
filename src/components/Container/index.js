import React, { PropTypes } from "react"

import styles from "./index.css"

const Container = (props, context) => {
    const id = (context.isPortfolio) ? 'my-scroll' : 'toto';
    return (
        <div id={id} className={ styles.container }>
            { props.children }
        </div>
)}

Container.propTypes = {
  children: PropTypes.node,
};

Container.contextTypes = {
  isPortfolio: PropTypes.bool,
};

export default Container
