import React, {PropTypes} from "react"
import TransitionPage from "../../components/TransitionPage"

import Page from "../Page"
import Contact from '../../components/Contact'
// import styles from "./index.css"

const ContactPage = (props) => {

    return (
        <TransitionPage transition="fade">
            <Page { ...props }>
                <Contact { ...props } key={props.head.title}/>
            </Page>
        </TransitionPage>
    );
}

ContactPage.propTypes = {
    head: PropTypes.object
};

export default ContactPage
