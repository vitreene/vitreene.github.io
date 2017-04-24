import React, {PropTypes} from "react"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Page from "../Page"
import Contact from '../../components/Contact'
import styles from "./index.css"

const ContactPage = (props) => {
    // console.log('PROPS Contact', props);

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
            <Page { ...props }>
                <Contact { ...props } key={props.head.title}/>
            </Page>
        </ReactCSSTransitionGroup>
    );
}

ContactPage.propTypes = {
    head: PropTypes.object
};

export default ContactPage
