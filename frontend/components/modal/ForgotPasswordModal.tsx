import {Button} from "@hilla/react-components/Button.js";
import {TextField} from "@hilla/react-components/TextField.js";
import './ForgotPasswordModal.css'
import React, {useState} from "react";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {UserEndpoint} from "Frontend/generated/endpoints";

const ForgotPasswordModal = () => {

    const [isUsernameExist, setIsUserNameExist] = useState<boolean>(false);
    const [email, setEmail] = useState('');

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setEmail(value)
    }

    const handleSendCodeClick = async () => {
        setIsUserNameExist(true);
    }

    return (
        <div>
            <h3 className={"text-signing"}> Email </h3>
            <HorizontalLayout className={"hl-alignment"}>
                <TextField onChange={handleInputChange} className={"field-signin"}>
                    Enter Your Email
                </TextField>
                <Button onClick={handleSendCodeClick} className={"sc-button"}>
                    Send Code
                </Button>
            </HorizontalLayout>
            {isUsernameExist ?
                <>
                    <h3 className={"code-title"}> Enter Code</h3>
                    <HorizontalLayout>
                        <TextField className={"code-textfield"}>
                            Enter Code
                        </TextField>
                        <Button className={"sc-button"}>
                            Submit
                        </Button>
                    </HorizontalLayout>
                </>
                : null}
        </div>
    );
}

export default ForgotPasswordModal;