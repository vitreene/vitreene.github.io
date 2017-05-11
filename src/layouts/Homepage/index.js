import React, { PropTypes } from "react"

import TransitionPage from "../../components/TransitionPage"
import CarouselLosange from '../../components/CarouselLosange'
import LatestPosts from '../../components/LatestPosts'
import Home from '../../components/Home'
import Offre from '../../components/Home/Offre'

import styles from './index.css'

const Homepage = (props) => {
  return (
  <TransitionPage top={false} myKey="homepage">
    <Home { ...props }
        header={
            <CarouselLosange diapos={props.head.diapos}>
                {props.head.title}
            </CarouselLosange>
        }>
        <Offre />
        <h2 className={ styles.heading2 }>Articles</h2>
        <LatestPosts />
    </Home>
  </TransitionPage>
  )
}

Homepage.propTypes = {
  head: PropTypes.object,
  };

export default Homepage
