import React, { PropTypes } from "react"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import styles from "./index.css"

const TransitionPage = ({transition = 'fade', top = true, children }) => {
// console.log('TransitionPage', transition);

    const transitionsOptions = {
      transitionName: transition,
      transitionAppear: true,
      transitionEnter: true,
      transitionLeave: true,
      transitionAppearTimeout: 500,
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300
    };

    return (
        <ReactCSSTransitionGroup
            {...transitionsOptions}
            component="div"
            className={top && styles.articleConteneur}>
                {children}
        </ReactCSSTransitionGroup>
    );}

TransitionPage.propTypes = {
  transition: PropTypes.string,
  children: PropTypes.node,
  };

export default TransitionPage;

