import React from 'react';

import ControlListeSujetBox from './ControlListeSujetBox'

import {sujets} from  '../../../content/portfolio/portfolio-data-sujets.json';
import {details} from '../../../content/portfolio/portfolio-data-details.json';


const Portfolio = (props) => {

        return (
            <ControlListeSujetBox
                {...props}
                sujets= {sujets}
                details={details}
            />
        );
    }

export default Portfolio
