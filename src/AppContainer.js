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

const AppContainer = (props) => {
    const {menu, toggle} = props;
    return (
      <Container>
          <DefaultHeadMeta />
          <Menu menu={menu} toggle={toggle}/>
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


function stateMenu(Comp){
    class StateMenu extends Component{
        /*
        static propTypes = {
            isOpen: PropTypes.bool,
            isVisible: PropTypes.bool,
            isAside: PropTypes.bool
        };
        */
        constructor(props) {
            super(props);
            this.toggle = this.toggle.bind(this);
            this.scrollAtTop = this.scrollAtTop.bind(this);
            this.state = {
                isOpen: true,
                isVisible: true,
                isAside: false
            };
        }
        componentWillMount() {
            window.addEventListener("scroll" , this.scrollAtTop );
        }
        componentWillUnmount() {
            window.removeEventListener("scroll" , this.scrollAtTop );
        }

        scrollAtTop(){
            (window.pageYOffset < 30) && console.log('-->TOP');
            this.setState({isOpen: (window.pageYOffset < 30) });
        }

        toggle(action, forcer){
            const togg = (forcer === undefined)
                ? !this.state[action]
                : forcer;
            this.setState({[action]: togg});
        }

        render() {
            return (
                <Comp
                    {...this.props}
                    menu={this.state}
                    toggle={this.toggle}
                />
            );
        }
    }
    StateMenu.displayName = `StateMenu(${Comp.displayName})`;
    return StateMenu;
}

export default stateMenu(AppContainer);
