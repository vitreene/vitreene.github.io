import RoueFortune from './roue-fortune'
import {lotsOBJ, annonceGagnant} from './loterie-1'

export default function loterie() {
    // const roue = document.getElementById('cible2');
    // console.log(roue, roue && !roue.hasChildNodes() );
    //
    // if (roue && roue.hasChildNodes()) return;
    new RoueFortune( "cible2", lotsOBJ, annonceGagnant );
}
