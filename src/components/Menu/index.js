import React, { PropTypes } from "react"
import {Link} from "phenomic"
import Svg from "react-svg-inline"

import styles from "./index.css"
import vitreene from '../icones/vitreene-logo.svg'
// import contact from '../icones/ico-contact.svg'
// import apropos from '../icones/ico-apropos.svg'

export default class Menu extends React.Component {
    //
    // static propTypes = {
    //     menu: PropTypes.object,
    //     toggle: PropTypes.func,
    // };
    //
    static contextTypes = {
        menu: PropTypes.object,
        toggle: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.canTouch = this.canTouch.bind(this);
        this.state = {};
        this.isTouch = false;
    }

    toggleMenu() { this.context.toggle('isOpen'); }
    canTouch() {this.isTouch = true ;}

    render() {
        const {isOpen, isVisible, isAside} = this.context.menu;
        const {isTouch} = this;

        const headerVisible = [
            styles.menuHeader,
            isVisible ? styles.headerVisible : styles.headerCache
        ].join(' ');

        const menuOpen = [
            styles.menuLinks,
            isOpen ? styles.menuOpen : styles.menuFerme
        ].join(' ');

        const logo = [
            styles.logoMenu,
            isOpen ? styles.logoOpen : styles.logoFerme,
            isAside ? styles.logoAside : '',
            isTouch ? '' : styles.logoAddHover,
        ].join(' ');

        const accueilMenu = [
            isOpen ? styles.itemMenuAccueil : '',
            styles.icoItem
        ].join(' ');

        return (
            <header className={headerVisible}>
                <div className={styles.headerPosition}>
                    <button className={logo}
                        onClick={this.toggleMenu}
                        onTouchStart={this.canTouch}>
                        <Svg svg={vitreene} className={styles.logoWrap} cleanup/>
                    </button>

                    <nav id="menu" className={menuOpen}>

                        <Link  to={"/"} className={accueilMenu}>
                            Accueil
                        </Link>

                        <div className={styles.menuSpacer}></div>

                        <div className={styles.menuGroup1}>
                            <Link  to={"/articles"}>
                                Articles
                            </Link>
                            <Link  to={"/portfolio"}>
                                Portfolio
                            </Link>
                        </div>
                        <div className={styles.menuGroup2}>
                            <Link to={"/about"}>
                                {/* <Svg svg={apropos} cleanup/> */}
                                A propos
                            </Link>
                            <a href="#contact-modal">
                                {/* <Svg svg={contact} cleanup/> className={styles.icoItem}*/}
                                Contact
                            </a>
                        </div>
                    </nav>
                    </div>
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


/*
<nav id="menu" className={menuOpen.join(' ')}>

    <ul id='menu-links' className={styles.menuLinks}>
        <li id="menu-accueil" className={accueilMenu.join(' ')}>
            <Link  to={"/"}>
                Accueil
            </Link>
        </li>

        <li className={styles.icoItem}>
            <Link  to={"/portfolio"}>
                Portfolio
            </Link>
        </li>

        <li className={styles.icoItem}>
            <Link  to={"/articles"}>
                Articles
            </Link>
        </li>

        <li>
            <Link to={"/about"}>
                <Svg svg={apropos} cleanup/>
                A propos
            </Link>
        </li>

        <li>
            <a href="#contact-modal">
                <Svg svg={contact} cleanup/>
                Contact
            </a>
        </li>
    </ul>
</nav>
*/
