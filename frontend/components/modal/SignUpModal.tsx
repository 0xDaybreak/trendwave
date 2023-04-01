import React, { useState } from 'react';
import './SignUpModal.css';
import TwitterOAuth from "Frontend/components/OAuth/TwitterOAuth";
interface SignUpModalProps {
    signUpBtnClicked:boolean;
    title:any;
    onClose:any;
}

const SignUpModal:React.FC<SignUpModalProps> = (props:SignUpModalProps) =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event:any) {
        event.preventDefault();
        // Handle form submission here, e.g. by sending data to server
        // and redirecting to the main page
        props.onClose();
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
                <form onSubmit={handleSubmit}>
                    <h2>{props.title}</h2>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div className="modal-buttons">
                        <button type="submit">Submit</button>
                        <button onClick={props.onClose}>Close</button>
                    </div>
                    <TwitterOAuth/>
                </form>
            </div>
        </div>
    );
}

export default SignUpModal;
