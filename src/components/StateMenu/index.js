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
            menu: PropTypes.object,
            toggle: PropTypes.func
        }

        static propTypes = {
            location:PropTypes.object,
        }

        state = {
            isOpen: true,
            isVisible: true,
            isAside: false,
            // hasHover: false
        }

        constructor(props) {
            super(props);
            this.toggle = this.toggle.bind(this);
            this.scrollAtTop = this.scrollAtTop.bind(this);
        }

        getChildContext() {
            const {pathname} = this.props.location;
            const isPortfolio = (pathname === '/portfolio/');
            return {
                isPortfolio,
                menu: { ...this.state },
                toggle: this.toggle
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
                (this.state.isOpen !== isOpen) && this.setState({isOpen});
            }
        }

        toggle(action, forcer) {
            const togg = (forcer === undefined)
                ? !this.state[action]
                : forcer;
            this.setState({[action]: togg});
        }

        render() {
            return (<Comp {...this.props}/>);
        }
    }
}
