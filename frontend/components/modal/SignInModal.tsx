import React, { useState } from 'react';
import './SignInModal.css';
import TwitterOAuth from "Frontend/components/OAuth/TwitterOAuth";
import {login} from "@hilla/frontend";
import { Button } from '@hilla/react-components/Button.js';
import {TextField} from "@hilla/react-components/TextField.js";
import {PasswordField} from "@hilla/react-components/PasswordField.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AiFillCloseCircle} from "react-icons/all";

interface SignInModalProps {
    signInBtnClicked?:boolean;
    title?:any;
    handleShowModal?:any;

}

const SignInModal:React.FC<SignInModalProps> = (props:SignInModalProps) =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleCloseModal = (event:any) => {
        event.preventDefault();
        props.handleShowModal();
    }

    function handleInputChange(event:any) {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <AiFillCloseCircle onClick={handleCloseModal} className={"close"}/>
                <form onSubmit={handleCloseModal}>
                    <h2 className={"title"}>{props.title}</h2>
                    <h3 className={"text-signing"}> Email </h3>
                    <TextField  name="username" onInput={handleInputChange} className={"field-signin"}>Email</TextField>
                    <h3 className={"text-signing"}>Password</h3>
                    <PasswordField name="password" onInput={handleInputChange} className={"field"}>Password</PasswordField>
                    <div className="modal-buttons">
                        <Button
                            theme="primary"
                            onClick={() =>
                                login(username, password, {loginProcessingUrl:"/home"})
                                    .then((e) => e.error ? console.warn("login failed") : props.handleShowModal())
                                    .catch((e) => console.warn(e))
                            }
                        >Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignInModal;
