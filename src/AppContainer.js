import React, { Component, PropTypes } from "react"

// import "./index.global.css"
// import "./highlight.global.css"
import "./css/main.global.scss"

import Container from "./components/Container"
import DefaultHeadMeta from "./components/DefaultHeadMeta"
import Menu from "./components/Menu"
// import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"

const isClient = typeof window !== "undefined";

const AppContainer = (props) => {
    return (
      <Container>
          <DefaultHeadMeta />
          <Menu/>
          <Content>
              { props.children }
          </Content>
          <Footer />
      </Container>
    );
}

AppContainer.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.object,
  toggle: PropTypes.func,
}

/*
media queries avec React :
https://github.com/d6u/react-container-query
*/

function stateMenu(Comp){
    class StateMenu extends Component{
        // static displayName = `StateMenu(${Comp.displayName})`;

        static childContextTypes = {
            menu: PropTypes.object,
            toggle: PropTypes.func,
        }

        constructor(props) {
            super(props);
            this.toggle = this.toggle.bind(this);
            this.scrollAtTop = this.scrollAtTop.bind(this);
            this.state = {
                isOpen: true,
                isVisible: true,
                isAside: false,
                hasHover: false,
            };
        }

        getChildContext() {
            const {toggle, state} = this;
            return { menu: {...state}, toggle };
        }

        componentWillMount() {
            isClient && window.addEventListener("scroll" , this.scrollAtTop );
        }
        componentWillUnmount() {
            isClient && window.removeEventListener("scroll" , this.scrollAtTop );
        }

        scrollAtTop(){
            if (isClient){
                const isOpen = (window.pageYOffset < 30);
                (this.state.isOpen !== isOpen) && this.setState({isOpen});
            }
        }

        toggle(action, forcer){
            const togg = (forcer === undefined)
                ? !this.state[action]
                : forcer;
            this.setState({[action]: togg});
        }

        render() {
            return ( <Comp {...this.props}/> );
        }
    }
    return StateMenu;
}

export default stateMenu(AppContainer);
