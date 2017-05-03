import React, { PropTypes } from "react"

import CarouselLosange from '../../components/CarouselLosange'
import LatestPosts from '../../components/LatestPosts'
import Home from '../../components/Home'
import Offre from '../../components/Home/Offre'
// import Page from '../Page'

/*
const diapos = [
    'DSC_0111-EARPHONES.jpg',
    'DSC_0324.jpg',
    'DSC_0329.jpg',
    'nuit-react.jpg',
    'axio-logo-linares.jpg',
    'cg-la.jpg'
];
*/
const Homepage = (props) => {
    // const {diapos, ...reste} = props;
    // console.log('props', props);
    // // console.log('diapos', diapos);
  return (
    <Home { ...props }
        header={
            <CarouselLosange diapos={props.head.diapos}>
                {props.head.title}
            </CarouselLosange>
        }>
        <Offre />
        <LatestPosts />
    </Home>
  )
}

Homepage.propTypes = {
  head: PropTypes.object,
  };

export default Homepage
