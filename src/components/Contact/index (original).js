import React, { Component, PropTypes } from "react"
import t from 'tcomb-form';
import axios from 'axios'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import CloseBox from '../CloseBox'
import styles from "./index.css"

const isClient = typeof window !== "undefined";
const {Form} = t.form;

// const _replyto = t.String;
// _replyto.getValidationErrorMessage = () => 'tu déconnes là';

const Lot = t.struct({
    name: t.String,
    _replyto: t.String,
    message: t.String,
    _gotcha: t.maybe(t.String),
    _subject: t.String,
    _next: t.String,
});


const options = {
    fields: {
        name: {
            label: 'Votre nom',
            error: <i>Veuillez entrer votre nom.</i>,
        },
        _replyto: {
            label: 'Votre e-mail',
            type: 'email',
            error: <i>Votre e-mail n'est pas valide</i>,
        },
        _gotcha: {
            type: 'hidden'
        },
        _next: {
            type: 'hidden'
        },
        _subject: {
            type: 'hidden'
        },
        message: {
            label: 'Votre message',
            type: 'textarea',
            error: <i>Vous n'avez pas laissé de message/</i>,
        }
    }
};



export const Contact = (props, context) => {
    return (context.modal.contactOpen)
        ? (<ContactForm {...props} {...context} />)
        : null;
};
Contact.contextTypes = {
    modal: PropTypes.object,
};


export class ContactForm extends Component {
    static contextTypes = {
        modal: PropTypes.object,
    }

    state = {
        value: {
            _next: (isClient) && window.location.href,
            _subject: 'un message venant du site !'
        }
     }

    constructor(props, context) {
        super(props, context);
        // console.log('CONTACT', props, context);
        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.form = null;
    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }


    handleClick(evt) {
      evt.nativeEvent.stopImmediatePropagation();
    }


    onChange(value) {
        this.setState({value});
    }

    onCancel(evt) {
        if (evt)  evt.preventDefault();
        this.context.modal.toggleContactModal();
    }

    handleKeyPress(evt) {
        // console.log(evt.keyCode);
        if (evt.keyCode === 27) {this.context.modal.toggleContactModal();}
        if (evt.keyCode === 13) {this.onSubmit(evt);}
    }

    onSubmit(evt) {
        if (evt)  evt.preventDefault();

        // console.log('this.form', this.form);
        console.log(this.form.validate());

        const value = this.form.getValue();
        console.log(value);
        if (value) {

            /*
            const r = new XMLHttpRequest();
            r.open('POST', 'https://formspree.io/contact@vitreene.com', true);
            r.setRequestHeader('Content-Type', 'application/json');
            // r.withCredentials = true;
            r.onreadystatechange =  () => {
              if (r.readyState != 4 || r.status != 200) return;
            //   console.log("Success: " + r.responseText);
              console.log("Success: " + r);
              this.onCancel();
            };
            r.send(value);

            */
            // Send a POST request
            axios({
                url: 'https://formspree.io/contact@vitreene.com',
                method: 'post',
                data: value,
                dataType: 'json'
            })
            .then( (res)=>{
                if (res.status===200) {
                    console.log('message envoyé avec succes.');
                    console.log(res);
                    this.onCancel();
                }
            });
        }
    }

    render() {
        const {value} = this.state;
        // const {contactOpen} = this.context.modal;
        const transitionsOptions = {
          transitionName: 'fad2',
          transitionAppear: true,
          transitionLeave: true,
          transitionAppearTimeout: 500,
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 300
        };


        return  (
            <ReactCSSTransitionGroup
                {...transitionsOptions}
                component="div"
            >
                <div className="contact-form-conteneur">
                    <ClicOutside cancel={this.onCancel}/>

                    <div className="contact-modal modal "
                        onClick={this.handleClick}
                    >
                        <CloseBox onClick={this.onCancel} />

                        <h2> Contactez Vitreene.com </h2>

                        <form
                            id="form-contact"
                            className="form-contact"
                            onSubmit={this.onSubmit}
                        >

                            <Form
                                ref={ form => (this.form = form) }
                                type={Lot}
                                options={options}
                                value={value}
                                onChange={this.onChange}
                            />

                            <div className="form-actions">
                                <input
                                    className="form-ajouter-validation"
                                    type="submit"
                                    value="Envoyer"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

 //

const ClicOutside = ({cancel, children}) => (
    <div id="overlay" className="edit-overlay" onClick={cancel}>
        {children}
    </div>
);
ClicOutside.propTypes = {
    cancel: PropTypes.func,
    children: PropTypes.node
};
