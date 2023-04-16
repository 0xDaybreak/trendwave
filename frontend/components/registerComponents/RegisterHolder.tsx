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
                    <h3 className={"text"}>Email</h3>
                    <TextField className={"field"}>Email</TextField>
                    <h3 className={"text"}>Password</h3>
                    <PasswordField className={"field"}>Password</PasswordField>
                    <h3 className={"text"}>Repeat Password</h3>
                    <PasswordField className={"field"}>Repeat Password</PasswordField>
                    <Button className={"button"}> Create Account</Button>
                </VerticalLayout>
            </div>
        </VerticalLayout>
    );
};

export default RegisterHolder;
