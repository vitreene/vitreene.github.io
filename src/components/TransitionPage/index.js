import React, { /*cloneElement, */ PropTypes } from "react"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import styles from "./index.css"

const TransitionPage = ({
    transition = 'fade', // classe de la transition,
    top = true, // decalage pour faire placeau menu
    myKey = null, // clé unique, title par défaut
    children
 }) => {
// console.log('TransitionPage', transition);

    const transitionsOptions = {
      transitionName: transition,
      transitionAppear: true,
      transitionEnter: true,
      transitionLeave: true,
      transitionAppearTimeout: 1000,
      transitionEnterTimeout: 1000,
      transitionLeaveTimeout: 1000
    };
    // console.log('myKey', myKey);
    
return (

    <ReactCSSTransitionGroup
        {...transitionsOptions}
        component="div"
        className={top && styles.articleConteneur}>
        {myKey && React.cloneElement(children, {key: myKey})
}
    </ReactCSSTransitionGroup>

);
}

TransitionPage.propTypes = {
  transition: PropTypes.string,
  myKey: PropTypes.string,
  top: PropTypes.bool,
  children: PropTypes.element,
};

export default TransitionPage;

