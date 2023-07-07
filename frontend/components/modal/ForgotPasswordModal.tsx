import {Button} from "@hilla/react-components/Button.js";
import {TextField} from "@hilla/react-components/TextField.js";
import './ForgotPasswordModal.css'
import {useEffect, useState} from "react";
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
        if (email.length !== 0) {
            await UserEndpoint.sendRecoveryEmail(email)
                .then(response => response?.response === 'SUCCESS')
                .then(result => {
                    setIsUserNameExist(result);
                });
        }
    }


    return (
        <div>
            <h3 className={"text-signing"}> Reset Password </h3>
            <h3 className={"text-font"}>Enter the email address you registered with and we will send you a link to reset
                your password.</h3>
            <h3 className={"text-signing"}> Email </h3>
            <HorizontalLayout className={"hl-alignment"}>
                <TextField onChange={handleInputChange} className={"field-signin-reset"}>
                    Enter Your Email
                </TextField>
                <Button onClick={handleSendCodeClick} className={"sc-button"}>
                    Send Reset Email
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