import React, { PropTypes } from "react"
import {Link} from "phenomic"
import Svg from "react-svg-inline"

import styles from "./index.css"
import vitreene from '../icones/vitreene-logo.svg'
import contact from '../icones/ico-contact.svg'
import apropos from '../icones/ico-apropos.svg'

export default class Menu extends React.Component {

    static propTypes = {
        menu: PropTypes.object,
        toggle: PropTypes.func,
        // isOpen: PropTypes.bool,
        // isVisible: PropTypes.bool,
        // isAside: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        // this.closeMenu = this.closeMenu.bind(this);
        this.state = {};
    }

    toggleMenu() { this.props.toggle('isOpen'); }
    // closeMenu() { this.props.toggle('isOpen', false); }
    render() {
        const {isOpen, isVisible, isAside} = this.props.menu;

        // const {toggle} = this.props;
        const headerVisible = [
            styles.menuHeader,
            isVisible ? styles.headerVisible : styles.headerCache
        ];
        const menuOpen = [
            styles.menuLinks,
            isOpen ? styles.menuOpen : styles.menuFerme
        ];
        const logo = [
            styles.logoMenu,
            isOpen ? styles.logoOpen : styles.logoFerme,
            isAside ? styles.logoAside : ''
        ];

        // console.log('TOGGLE isOpen ', isOpen, menuOpen);

        return (
            <header className={headerVisible.join(' ')}>

                <button className={logo.join(' ')} onClick={this.toggleMenu}>
                    <Svg svg={vitreene} cleanup/>
                </button>

                <nav id="menu" className={menuOpen.join(' ')}>

                    <ul id='menu-links' className={styles.menuLinks}>
                        <li id="menu-accueil" className={styles.icoItem}>
                            <Link  to={"/"}>
                                Accueil
                            </Link>
                        </li>

                        <li>
                            <Link to={"/about"}>
                                {/* <Svg svg={apropos} cleanup/> */}
                                A propos
                            </Link>
                        </li>

                        <li>
                            <a href="#contact-modal">
                                {/* <Svg svg={contact} cleanup/> */}
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>

            </header>
        );
    }
}

/*
etats du menu : - ouvert au clic sur le logo; - ouvert lorsque on est en top page; - fermé au scroll vers le bas, après un leger délai (ou une distance minimale parcourue) - fermé au clic sur le logo. - etat masqué : menu et logo disparaissent/reapaaraissent - etat retrait : le logo pivot et se cale sur le bord gauche de l'écran. dans un premeir temps, les entrées du menu sont en dur, le temps de comprendre comment recréer la fonctionnalité voulue (si c'est utile) entrées : - portfolio, - articles, - Contact */ /*
<nav id="menu" class="zone-menu stuck {{#if close}}init-close {{/if}}">

    <a href="/" id='menu-logo' class="menu-logo menu-open"></a>

    <ul id='menu-links' class="menu-links">
        <li id="menu-accueil" class="ico-item">
            <a href="/">Accueil</a>
        </li>

        {{
            #each collections.pages
        }}
        <li class="ico-item">
            <a href="/{{path}}">
                <span class={{
                    icon
                }}></span>
                {{
                    title
                }}</a>
        </li>
        {{
            /each}}

        <li id="menu-contact" class="ico-item item-contact">
            <a href="#contact-modal">
                <span class="ico-contact"></span>
                Contact</a>
        </li>

    </ul>
</nav>
*/
