import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import React, {useState} from "react";
import {Button} from "@hilla/react-components/Button.js";
import {TextField} from "@hilla/react-components/TextField.js";
import {Notification} from "@hilla/react-components/Notification.js"
import "@vaadin/vaadin-lumo-styles/utility.js";
import "./RegisterHolder.css";
import sheepImg from 'Frontend/images/sheep.png';
import {PasswordField} from "@hilla/react-components/PasswordField.js";
import {UserEndpoint} from "Frontend/generated/endpoints";
import user from "Frontend/generated/com/video/application/entity/User";
import User from "Frontend/generated/com/video/application/entity/User";
import {useNavigate} from "react-router-dom";

const RegisterHolder = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [notificationOpened, setNotificationOpened] = useState(false);

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


    const handleRegister = () => {
        if (password1 === password2 && emailRegex.test(email)) {
            const u: User = {
                username: email,
                password: password2,
            };
            openNotification("User Registration successful. You can login now")
            UserEndpoint.saveUser(u).then(() => navigate("/"));
        } else {
            openNotification("User registration failed. Please Make sure that the passwords match and that you have entered a valid email")
        }
    }

    const openNotification = (input:string) => {
        setNotificationOpened(true);
        const notification = Notification.show(input, {
            position: "bottom-center", duration:5000 });
        const handleOpenChanged = (e: any) => {
            if (!e.detail.value) {
                setNotificationOpened(false);
                notification.removeEventListener("opened-changed", handleOpenChanged);
            }
        };
        notification.addEventListener("opened-changed", handleOpenChanged);
    }

    return (
        <VerticalLayout className="card-holder-vertical-layout">
            <div className={"m-auto"}>
                <VerticalLayout className={"min-h-screen"}>
                    <img className={"image"} alt="logo" src={sheepImg}/>
                    <h3 className={"text"}>Email</h3>
                    <TextField onChange={handleInputChange} name={'email'} className={"field"}>Email</TextField>
                    <h3 className={"text"}>Password</h3>
                    <PasswordField onChange={handleInputChange} name={'password1'}
                                   className={"field"}>Password</PasswordField>
                    <h3 className={"text"}>Repeat Password</h3>
                    <PasswordField onChange={handleInputChange} name={'password2'} className={"field"}>Repeat
                        Password</PasswordField>
                    <Button onClick={handleRegister} disabled={notificationOpened} className={"button"}> Create
                        Account</Button>
                </VerticalLayout>
            </div>
        </VerticalLayout>
    );
};

export default RegisterHolder;
