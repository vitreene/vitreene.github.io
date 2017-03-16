import React, {PropTypes} from "react"

// import "./index.global.css"
import "./highlight.global.scss"
import "./css/main.global.scss"

import StateMenu from "./components/StateMenu"
import Container from "./components/Container"
import DefaultHeadMeta from "./components/DefaultHeadMeta"
import Menu from "./components/Menu"
// import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"


const AppContainer = (props) => {
    return (
        <Container>
            <DefaultHeadMeta/>
            <Menu/>
            <Content>
                {props.children}
            </Content>
            <Footer/>
        </Container>
    );
}

AppContainer.propTypes = {
    children: PropTypes.node,
}

export default StateMenu(AppContainer);
