import React, {Component, PropTypes} from "react"
import t from 'tcomb-form';
import axios from 'axios'
import {browserHistory} from "phenomic/lib/client"


const isClient = typeof window !== "undefined";
const {Form} = t.form;

const Lot = t.struct({
    name: t.String,
    _replyto: t.String,
    message: t.String,
    _gotcha: t.maybe(t.String),
    _subject: t.String,
    _next: t.String
});

const options = {
    fields: {
        name: {
            label: 'Votre nom',
            error: <i>Veuillez entrer votre nom.</i>
        },
        _replyto: {
            label: 'Votre e-mail',
            type: 'email',
            error: <i>Votre e-mail n'est pas valide</i>
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
            error: <i>Vous n'avez pas laissé de message :-/</i>
        }
    }
};

export default class Contact extends Component {
    static contextTypes = {
        location: PropTypes.object
    }

    state = {
        value: {
            _next: (isClient) && window.location.href,
            _subject: 'un message venant du site !'
        },
      alert: {
        show: false,
        type: '',
        text: ''
      }        
    }
    form = null

    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sendFormData = this.sendFormData.bind(this);
        this.sendByAxios = this.sendByAxios.bind(this);
    }

    handleClick(evt) {
        evt.nativeEvent.stopImmediatePropagation();
    }

    handleKeyPress(evt) {
        if (evt.keyCode === 13) {
            this.onSubmit(evt);
        }
    }

    onChange(value) {
        this.setState({value});
    }

    onSubmit(evt) {
        if (evt) 
            evt.preventDefault();
        const value = this.form.getValue();

        if (value) 
            this.setState({
                alert: { 
                    show: true, 
                    type: 'info', 
                    text: 'Envoi...'
                },
                submitted: true
                }, 
                this.sendByAxios(value)
            );
  
    }

    sendByAxios(value) {
        const comeback = () => setTimeout( () => browserHistory.goBack(), 1000);
                    // Send a POST request
            axios({
                url: 'https://formspree.io/contact@vitreene.com',
                method: 'post',
                data: value,
                dataType: 'json'
            })
            .then( (res)=>{
                if (res.status===200) {
                    // console.log('message envoyé avec succes.');
                     this.setState({
                        alert: {
                            show: true,
                            type: 'success',
                            text: 'Votre message a bien été envoyé. Merci !'
                        },
                        value:{},
                    },
                   comeback
                    );
                } else {
                    this.setState({
                        alert: {
                            show: true,
                            type: 'danger',
                            text: 'Désolé, une erreur s’est produite ; veuillez envoyer votre message directement à l’adresse suivante : '  
                            + 'contact@vitreen' 
                            + 'e.com'
                        }
                    });
                }
            });
    }

    sendFormData(json) {
        // ne fonctionne pas. 
        // Send the form data.
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'https://formspree.io/contact@vitreene.com', true);
        xmlhttp.setRequestHeader('Accept', 'application/json');
        xmlhttp.setRequestHeader('Content-Type', 'application/json');

        xmlhttp.send(json);

        xmlhttp.onreadystatechange =  ()=> {
            // <4 =  waiting on response from server
            if (xmlhttp.readyState < 4) 
                this.setState({
                    alert: {
                        show: true,
                        type: 'info',
                        text: 'Loading...'
                    }
                })
                // 4 = Response from server has been completely loaded.
            else if (xmlhttp.readyState === 4) {
                // 200 - 299 = successful
                if (xmlhttp.status === 200 && xmlhttp.status < 300) {
                    this.setState({
                        alert: {
                            show: true,
                            type: 'success',
                            text: 'Votre message a bien été envoyé. Merci !'
                        },
                        value:{}
                    });
                } else {
                    this.setState({
                        alert: {
                            show: true,
                            type: 'danger',
                            text: 'Désolé, une erreur s’est produite ; veuillez envoyer votre message directement à l’adresse suivante : '  
                            + 'contact@vitreen' 
                            + 'e.com'
                        }
                    });
                }
            }
        };
    }

    render() {
        const {value} = this.state;
        return (
            <div className="contact-form-conteneur">
                <div>
                <form id="form-contact" className="form-contact" onSubmit={this.onSubmit}>
                { this.state.alert.show &&
                <div className={ 'contact-alert'  + ' alert-' + this.state.alert.type }>
                    { this.state.alert.text }
                </div>
                }
                    <Form
                        ref={form => (this.form = form)}
                        type={Lot}
                        options={options}
                        value={value}
                        onChange={this.onChange}/>

                    <div className="form-actions">
                        <input className="btn-submit" type="submit" value="Envoyer"/>
                    </div>
                </form>
                </div>
            </div>
        );
    }
}
