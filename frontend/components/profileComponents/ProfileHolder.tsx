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
                    </div>
                </VerticalLayout>
            </div>
        </VerticalLayout>
    )
}

export default ProfileHolder;