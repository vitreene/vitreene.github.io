import React, { PropTypes } from "react"

const Plots = (props) => {
    // console.log('Plots', props);
    const plots = Array(props.count).fill('•').map( (fill, index) => (
        <li key={'plots' + index}
            id={'plots' + index}
            onClick={props.goto}
            className={ ( props.current === index) ? "plots-current" : ''}
        >
            {fill}
        </li>
        )
    );

    return (
      <ul
          onMouseEnter={props.enter}
          onMouseLeave={props.leave}
          className="panel-carrousel--cadre-plots">
          {plots}
      </ul>
      );
  };

  Plots.propTypes = {
      count: PropTypes.number,
      current: PropTypes.number,
      goto: PropTypes.func,
      enter: PropTypes.func,
      leave: PropTypes.func,
  };

  export default Plots
