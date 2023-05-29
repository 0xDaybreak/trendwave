import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import React, {useState} from "react";
import {Button} from "@hilla/react-components/Button.js";
import {TextField} from "@hilla/react-components/TextField.js";
import "@vaadin/vaadin-lumo-styles/utility.js";
import "./RegisterHolder.css";
import sheepImg from 'Frontend/images/sheep.png';
import {PasswordField} from "@hilla/react-components/PasswordField.js";
import {UserEndpoint} from "Frontend/generated/endpoints";
import User from "Frontend/generated/com/video/application/entity/User";
import {useNavigate} from "react-router-dom";
import {openNotification} from "Frontend/components/Notification";

const RegisterHolder = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [showTip, setShowTip] = useState(false)
    const emailRegex = /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;


    function handleInputChange(event: any) {

        const {name, value} = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password1') {
            setPassword1(value);
        } else if (name === 'password2') {
            setPassword2(value)
        }
    }

    const handleShowTip = () => {
        setShowTip(true);
    }

    const handleRegister = async () => {
        if (password1 === password2 && emailRegex.test(email) && !await UserEndpoint.isUsernameExist(email)) {
            const u: User = {
                username: email,
                password: password2,
            };
            openNotification("User Registration successful. You can login now", "bottom-center")
            UserEndpoint.saveUser(u).then(() => navigate("/"));
        } else {
            openNotification("User registration failed. Please Make sure that the passwords match and that you have entered a valid email", "bottom-center")
        }
    }
    return (
        <VerticalLayout className="card-holder-vertical-layout-register">
            <div className={"m-auto"}>
                <VerticalLayout className={"min-h-screen"}>
                    <img className={"image"} alt="logo" src={sheepImg}/>
                    <h3 className={"text"}>Email</h3>
                    <TextField onChange={handleInputChange} name={'email'} className={"field"}>Email</TextField>
                    <h3 className={"text"}>Password</h3>

                    <PasswordField onKeyUp={handleShowTip} onChange={handleInputChange} name={'password1'}
                                   className={"field"}>Password</PasswordField>
                    {showTip? <span className={"tip"}>A password must be at least 8 characters. It has to have at least one letter and one digit.</span> : <span></span>}
                    <h3 className={"text"}>Repeat Password</h3>
                    <PasswordField onChange={handleInputChange} name={'password2'} className={"field"}>Repeat
                        Password</PasswordField>
                    <Button onClick={handleRegister} className={"ca-button"}> Create
                        Account</Button>
                </VerticalLayout>
            </div>
        </VerticalLayout>
    );
};

export default RegisterHolder;
