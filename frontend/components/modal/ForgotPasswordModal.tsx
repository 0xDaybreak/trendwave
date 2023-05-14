import { Button } from "@hilla/react-components/Button.js";
import {TextField} from "@hilla/react-components/TextField.js";
import './ForgotPasswordModal.css'
import React from "react";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout.js";

const ForgotPasswordModal = () => {
    return (
      <div>
          <h3 className={"text-signing"}> Email </h3>
          <HorizontalLayout className={"hl-alignment"}>
              <TextField className={"field-signin"}>
                  Enter Your Email
              </TextField>
              <Button className={"sc-button"}>
                  Send Code
              </Button>
          </HorizontalLayout>
      </div>
    );
}

export default ForgotPasswordModal;