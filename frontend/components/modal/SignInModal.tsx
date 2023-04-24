import React, { useState } from 'react';
import './SignInModal.css';
import {login} from "@hilla/frontend";
import { Button } from '@hilla/react-components/Button.js';
import {TextField} from "@hilla/react-components/TextField.js";
import {PasswordField} from "@hilla/react-components/PasswordField.js";
import {AiFillCloseCircle} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import sheepWave from "Frontend/images/sheepwave.png";
import {openNotification} from "Frontend/components/Notification";

interface SignInModalProps {
    signInBtnClicked?:boolean;
    title?:any;
    handleShowModal?:any;
    onLogin: () => void;
}

const SignInModal:React.FC<SignInModalProps> = (props:SignInModalProps) =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleCloseModal = (event:any) => {
        event.preventDefault();
        props.handleShowModal();

    }

    const handleLogIn = () => {
        props.handleShowModal()
        navigate('/');
        props.onLogin();
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
                            className={"sn-button"}
                            onClick={() =>
                                login(username, password, {loginProcessingUrl:"/home"})
                                    .then((e) => e.error ? openNotification("Invalid user", "middle"): handleLogIn())
                                    .catch((e) => console.warn(e))
                            }
                        >Login
                        </Button>

                    </div>
                </form>
                <img className={"image-modal"} alt="logo" src={sheepWave}/>
            </div>
        </div>
    );
}

export default SignInModal;
