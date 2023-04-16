import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import React from "react";
import {Button} from "@hilla/react-components/Button.js";
import {TextField} from "@hilla/react-components/TextField.js";
import '@vaadin/vaadin-lumo-styles/utility.js';
import './RegisterHolder.css';
const RegisterHolder = () => {
    return (
    <VerticalLayout className="card-holder-vertical-layout">
        <div className={"m-auto"}>
            <VerticalLayout className={"min-h-screen"}>
                <TextField className={"text"}>Email</TextField>
                <TextField>Password</TextField>
                <TextField>Repeat Password</TextField>
                <Button className={"text"}> Create Account</Button>
            </VerticalLayout>
        </div>
    </VerticalLayout>
    );

}

export default RegisterHolder;