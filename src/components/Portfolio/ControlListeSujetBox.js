import React, {Component, PropTypes} from 'react'
import PanelBox from './panel-box'

// faire suivre le layout / css !
const itemsInRow = 3 ;

class ControlListeSujetBox extends Component {
    static contextTypes = {
        isPortfolio: PropTypes.bool,
        menu: PropTypes.object,
        toggle: PropTypes.func,
    };

    static propTypes = {
        details: PropTypes.array,
        sujet: PropTypes.object
    };

    state = {
        togglePanel: false,
        panelId: null
    };

    constructor(props, context) {
        super(props, context);
        this.preloadFirst = this.preloadFirst.bind(this);
        this.setTogglePanel = this.setTogglePanel.bind(this);
        this.firstImgs = [];
    }

    componentDidMount() {
        // pre-charger les premieres images des sujets
        const imgs = this.props.details.map((img) => require('../../../content/portfolio/portfolio2/' + img.files[0].file));
        this.firstImgs = this.preloadFirst(imgs);

        // reduire le menu
        this.context.toggle('isOpen', false);
    }

    preloadFirst(imgs) {
        return imgs.map((el) => {
            const img = new Image();
            img.src = el;
            return img;
        });
    }

    setTogglePanel(etat, id) {
        const togglePanel = {
            close: false,
            // mettre à jour ou fermer le panel
            toggle: (id === this.state.sujet)
                ? !this.state.togglePanel
                : true
        };
        const sujet = {
            close: null,
            toggle: id
        };

        this.setState({
            togglePanel: togglePanel[etat],
            panelId: sujet[etat]
        });

        // masquer le menu quand le panneau est ouvert
        this.context.toggle('isVisible', !togglePanel.toggle);
    }

    render() {
        return (
            <ListeSujetBox
                {...this.props}
                {...this.state}
                setTogglePanel={this.setTogglePanel}
            />
        );
    }
}


const ListeSujetBox = (props) => {
    // let sujets = [];
    /*
    identifier à quel endroit je dois ajouter le panel :
    - position de props.sujet dans la liste;
        -> findindex
    - trouver l'id en fin de ligne
    - ajouter panel quand id est atteint.
    */
    const {panelId, setTogglePanel} = props;
    const isOpenPanel = props.togglePanel; //-> state
    const indexId = insertPanelAfter(props.details, panelId, itemsInRow);


    // 3 conditions pour placer le panel :
    // - cliqué sur un sujet pour l'ouvrir,
    // - sur quelle ligne se trouve le sujet cliqué,
    // - quel est le dernier sujet sur cette ligne
    // le panneau est placé juste après.
/*
    let isOnRow = 0;
    let isFinDeLigne = 0;
*/
    const details = (panelId)
        ? getDetail(panelId, props.details)
        : null;
        // console.log("DETAILS",details);
    const panelSujet = {details, id: 'panel-' + panelId, setTogglePanel};
    const panelBox = (isOpenPanel)
    ? ( <PanelBox {...panelSujet} key={'panel-' + panelId}/> )
    : null;

    const sujetsList = props.sujets.map( (sujet, index) => {
        const {id} = sujet;
        const isFinDeLigne = (index % itemsInRow === 0);
        const dataSujet = {sujet, id, isFinDeLigne, setTogglePanel};
        const sujetBox = ( <SujetBox {...dataSujet} key={id}/> );
        return sujetBox;
    } )
    const sujets = sujetsList
    .slice(0, indexId+1)
    .concat(panelBox, sujetsList.slice(indexId+1) );
/*
    for(let i = 0; i < props.sujets.length; i++) {
      const sujet = props.sujets[i];

      if (props.sujet) {
       isOnRow += ( sujet.id === props.sujet );
      }

      isFinDeLigne = !( (i+1) % itemsInRow ) ||
         ( i === props.sujets.length -1 );

      sujets.push (
       <SujetBox
           sujet={sujet}
           key={sujet.id}
           isFinDeLigne={isFinDeLigne}
           setTogglePanel={props.setTogglePanel}
       /> )  ;

    //    console.log('isOnRow %s, isFinDeLigne %s, isOpenPanel %s', isOnRow, isFinDeLigne, isOpenPanel);

        // détails sera this.props.detail
      if (isOnRow && isFinDeLigne && isOpenPanel) {

          console.log('FinDeLigne', indexId, sujet.id);

        sujets.push (
          <PanelBox
              details={details}
              key={'panel' + sujet.id}
              id={'panel' + sujet.id}
              setTogglePanel={props.setTogglePanel}
          /> ) ;
        isOnRow = 0 ; // eviter les doublons
      }

   }
*/
   function insertPanelAfter(obj, id, itemsInRow) {
       // if ( (!obj || !id || !itemsInRow) ) return;
       const liste = obj.map( el => el.id );
       const {length} = liste;
       const ordre = liste.findIndex(o => o === id);
       const endRow = (Math.floor(ordre / itemsInRow) + 1) * itemsInRow - 1;
       const index = ((length - 1) > endRow) ? endRow : length - 1;
       return index;
   }

   function getDetail(id, details) {
     return details.filter( (detail) => id === detail.id )[0];
   }

    return (
      <ul id="sujets" className="sujets">
       {sujets}
      </ul>
     );
}

ListeSujetBox.propTypes = {
    setTogglePanel: PropTypes.func,
    // data: PropTypes.object,
    details: PropTypes.array,
    sujets: PropTypes.array,

    togglePanel: PropTypes.bool,
    sujet: PropTypes.string,
    panelId: PropTypes.string,
}



const SujetBox = (props) => {
    const {sujet, setTogglePanel, isFinDeLigne} = props;
    let panel = null;
    const lastInRow = 'sujet' + (isFinDeLigne ? ' last' : '');
    const bgImg = require('../../../content/portfolio/portfolio2/' + sujet.vignette);
    const togglePanel = () => setTogglePanel('toggle', panel.id);

    return (
        <li ref={ref => panel = ref}
            onClick={togglePanel}
            className={lastInRow}
            id={sujet.id}
            style={{backgroundImage: 'url(' + bgImg + ')'}}
        >
            <div className="legende-wrapper">
                <span className="legende">{sujet.vignetteTitre}</span>
            </div>
        </li>
    );
}

SujetBox.propTypes = {
    sujet: PropTypes.object,
    setTogglePanel: PropTypes.func,
    isFinDeLigne: PropTypes.bool,
}

export default ControlListeSujetBox;
