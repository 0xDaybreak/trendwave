import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import "./ProfileHolder.css"
import React from "react";
import { TextField } from "@hilla/react-components/TextField.js";

const ProfileHolder = () => {
    return (
        <VerticalLayout className="profile-holder-vertical-layout">
            <div className={"m-auto"}>
                <VerticalLayout className={"min-h-screen"}>
                    <div className={"profile-holder"}>
                        <h3 className={"text-profile"}>Name</h3>
                        <TextField name={'name'} className={"field-profile"}>Name</TextField>
                        <h3 className={"text-profile"}>Email</h3>
                        <TextField name={'email'} className={"field-profile"}>Email</TextField>
                    </div>
                </VerticalLayout>
            </div>
        </VerticalLayout>
    )
}

export default ProfileHolder;