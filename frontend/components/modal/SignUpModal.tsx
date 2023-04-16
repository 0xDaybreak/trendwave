import React, { useState } from 'react';
import './SignUpModal.css';
import TwitterOAuth from "Frontend/components/OAuth/TwitterOAuth";
interface SignUpModalProps {
    signInBtnClicked:boolean;
    title:any;
    handleShowModal:any;

}

const SignUpModal:React.FC<SignUpModalProps> = (props:SignUpModalProps) =>{
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
                <form onSubmit={handleCloseModal}>
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
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                    <TwitterOAuth/>
                </form>
            </div>
        </div>
    );
}

export default SignUpModal;
