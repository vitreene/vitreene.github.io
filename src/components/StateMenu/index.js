// Commander le comportement du menu via context

import React, {Component, PropTypes} from "react"

const isClient = typeof window !== "undefined";
    /*
      media queries avec React :
      https://github.com/d6u/react-container-query
      */

export default function(Comp) {
    return class StateMenu extends Component {
        static childContextTypes = {
            isPortfolio: PropTypes.bool,
            toggle: PropTypes.func,
            menu: PropTypes.object,
            modal: PropTypes.object,
        }

        static propTypes = {
            location:PropTypes.object,
        }

        state = {
            menu: {
                isOpen: true,
                isVisible: true,
                isAside: false,
                // hasHover: false
                },
                modal: {
                    contactOpen: false
                }
        }

        constructor(props) {
            super(props);
            this.toggle = this.toggle.bind(this);
            this.toggleContactModal = this.toggleContactModal.bind(this);
            this.scrollAtTop = this.scrollAtTop.bind(this);
        }

        getChildContext() {
            const {pathname} = this.props.location;
            const isPortfolio = (pathname === '/portfolio/');
            return {
                isPortfolio,
                menu: { ...this.state.menu },
                toggle: this.toggle,
                modal: {
                    toggleContactModal: this.toggleContactModal,
                    contactOpen: this.state.modal.contactOpen,
                    pathname
                }
            };
        }

        componentWillMount() {
            isClient && window.addEventListener("scroll", this.scrollAtTop);
        }
        componentWillUnmount() {
            isClient && window.removeEventListener("scroll", this.scrollAtTop);
        }

        scrollAtTop() {
            if (isClient) {
                const isOpen = (window.pageYOffset < 30);
                const {menu} = this.state;
                if (menu.isOpen !== isOpen) {
                     menu.isOpen = isOpen;
                     this.setState({menu});
                    }
            }
        }

        toggle(action, forcer) {
            const togg = (forcer === undefined)
                ? !this.state.menu[action]
                : forcer;
            this.setState({menu:{...this.state.menu, [action]: togg}});
        }

        toggleContactModal(action){
            
            const contactOpen = (action === undefined)
                ? !this.state.modal.contactOpen
                : !!action;
            this.setState({modal:{...this.state.modal, contactOpen}});
        }

        render() {
            return (<Comp {...this.props}/>);
        }
    }
}
