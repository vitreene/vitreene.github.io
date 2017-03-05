import React from 'react'

import Carousel from '../../components/Carousel'
import LatestPosts from '../../components/LatestPosts'
import Page from '../Page'

const diapos = [
    'DSC_0111-EARPHONES.jpg',
    'DSC_0324.jpg',
    'DSC_0329.jpg',
    'nuit-react.jpg',
    'axio-logo-linares.jpg',
    'cg-la.jpg'
];

const Homepage = (props) => {
  return (
    <Page { ...props }>
      <Carousel diapos={diapos}/>
      <LatestPosts />
    </Page>
  )
}

export default Homepage
