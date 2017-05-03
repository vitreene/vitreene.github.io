import React, { PropTypes } from 'react'

import styles from "./plots.css"

const Plots = (props) => {
    const {active, count, aller, pause} = props;
    const enter = () => pause(true);
    const leave = () => pause(false);

    // console.log('Plots', props);
    const plots = Array(count).fill('•').map( (fill, index) => {
        const plotStyle = [
            styles.plots,
            ( active === index) && styles.plotsCurrent
        ].join(' ');
        return (
        <li key={'plots' + index}
            id={'plots' + index}
            onClick={aller}
            className={ plotStyle}
        >
            {fill}
        </li>
        )}
    );

    return (
      <ul className={styles.cadrePlots}
          onMouseEnter={enter}
          onMouseLeave={leave}
      >
          {plots}
      </ul>
      );
  };

  Plots.propTypes = {
      count: PropTypes.number,
      active: PropTypes.number,
      aller: PropTypes.func,
      pause: PropTypes.func,
  };

  export default Plots
