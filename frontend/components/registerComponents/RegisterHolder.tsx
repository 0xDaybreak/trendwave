import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import React from "react";
import { Button } from "@hilla/react-components/Button.js";
import { TextField } from "@hilla/react-components/TextField.js";
import "@vaadin/vaadin-lumo-styles/utility.js";
import "./RegisterHolder.css";
import sheepImg from 'Frontend/images/sheep.png';
import {PasswordField} from "@hilla/react-components/PasswordField.js";

const RegisterHolder = () => {
    return (
        <VerticalLayout className="card-holder-vertical-layout">
            <div className={"m-auto"}>
                <VerticalLayout className={"min-h-screen"}>
                    <img className={"image"} alt="logo" src={sheepImg} />
                    <TextField className={"field"}>Email</TextField>
                    <PasswordField className={"field"}>Password</PasswordField>
                    <PasswordField className={"field"}>Repeat Password</PasswordField>
                    <Button className={"text"}> Create Account</Button>
                </VerticalLayout>
            </div>
        </VerticalLayout>
    );
};

export default RegisterHolder;
