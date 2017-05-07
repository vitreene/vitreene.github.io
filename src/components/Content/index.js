import React, { PropTypes } from "react"
import styles from "./index.css"

const Content = ({children}) => (
        <div className={ styles.content } >
            {children}
        </div>
    );

Content.propTypes = {
    children: PropTypes.node,
}

export default Content

/*

const Content = (props, context) => {
    const portfolio = (context.isPortfolio) ? styles.portfolio : '';
    return (
        <div className={ styles.content + ' ' + portfolio } >
            {props.children}
        </div>
    )

}

Content.contextTypes = {
    isPortfolio: PropTypes.bool,
}

*/
