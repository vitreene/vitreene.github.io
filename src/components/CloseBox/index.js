import React, {PropTypes} from 'react'

// id="panel-close"
const CloseBox = ({onClick}) => (
    <button
        type="button"
        name="panel-close"
        className="panel-close"
        onClick={onClick}
    >
        <svg id="ico-contact-close" className="ico-contact-close" viewBox="0 0 50 37" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.41">

            <ellipse className="s1" cx="24.87" cy="17.75" rx="22.27" ry="15.15"/>
            <path className="s2" d="M18.23 12.8l6.63 4.94-6.63 4.97m13.27.03l-6.62-4.97 6.63-4.96"/>
        </svg>
    </button>
);


CloseBox.propTypes = {
    onClick: PropTypes.func,
}

export default CloseBox
