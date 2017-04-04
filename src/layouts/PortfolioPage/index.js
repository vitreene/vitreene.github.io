import React , { PropTypes } from "react"

import Portfolio from '../../components/Portfolio'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const PortfolioPage = (props) => {
    // console.log('PROPS portfolio', props);

    const transitionsOptions = {
      transitionName: 'fad2',
      transitionAppear: true,
      transitionAppearTimeout: 500,
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 300
    };

    return (
        <ReactCSSTransitionGroup
            {...transitionsOptions}
            component="div"
        >
            <Portfolio { ...props } key={props.head.title} />
        </ReactCSSTransitionGroup>
) ;}


PortfolioPage.propTypes = {
  head: PropTypes.object,
  };

export default PortfolioPage
