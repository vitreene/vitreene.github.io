import React, { PropTypes } from 'react'

const Plots = (props) => {
    const {active, count, aller, play} = props;
    const enter = () => play('off');
    const leave = () => play('on');
    // console.log('Plots', props);
    const plots = Array(count).fill('•').map( (fill, index) => (
        <li key={'plots' + index}
            id={'plots' + index}
            onClick={aller}
            className={ ( active === index) ? "plots-current" : ''}
        >
            {fill}
        </li>
        )
    );

    return (
      <ul className="panel-carrousel--cadre-plots"
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
      enter: PropTypes.func,
      leave: PropTypes.func,
  };

  export default Plots
