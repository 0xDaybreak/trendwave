import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import {GoThreeBars} from "react-icons/go";
import './Topbar.css';
import React, {useState} from "react";

interface TopbarProps {
    onThreeBarsMenuClick:any;
    onSignUpBtnClick:any;
}

const Topbar:React.FC<TopbarProps> = (props:TopbarProps) => {
    const sendDataToParent = () => {
        handleSignUpBtnClick();
    }
    const[showSignUpModal, setShowSignUpModal] = useState(true)

    const handleSignUpBtnClick = () => {
        setShowSignUpModal((prevState:boolean) => (!prevState));
        props.onSignUpBtnClick(showSignUpModal)
    }


    return (
        <div className="tb">
            <HorizontalLayout >
                <GoThreeBars className="menubars" onClick={props.onThreeBarsMenuClick}/>
                <Button className={"topbar-buttons"}>Home</Button>
                <div className="topbar-right-buttons">
                    <Button onClick={sendDataToParent} className="topbar-right-button">Create Account</Button>
                    <Button className="topbar-right-button">Sign in</Button>
                </div>
            </HorizontalLayout>

        </div>

    );
}

export default Topbar