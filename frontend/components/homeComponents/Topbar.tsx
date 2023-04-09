import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import {GoThreeBars} from "react-icons/go";
import './Topbar.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface TopbarProps {
    onThreeBarsMenuClick:any;
    onSignUpBtnClick:any;
    isMobile: boolean;
}

const Topbar:React.FC<TopbarProps> = (props:TopbarProps) => {

    const navigate = useNavigate();

    const handleHomeButtonClick = () => {
        navigate('/');
    };

    const sendDataToParent = () => {
        handleSignUpBtnClick();
    }
    const[showSignUpModal, setShowSignUpModal] = useState(true)

    const handleSignUpBtnClick = () => {
        setShowSignUpModal((prevState:boolean) => (!prevState));
        props.onSignUpBtnClick(showSignUpModal)
    }

    const [mobileState, setMobileState] = useState(props.isMobile);

    useEffect(() => {
        setMobileState(props.isMobile);
    }, [props.isMobile]);

    return (
        <div className="tb">
            <HorizontalLayout>
                <GoThreeBars className={`menubars ${props.isMobile ? 'menubars-disabled':''}`} onClick={props.onThreeBarsMenuClick}/>
                <Button onClick={handleHomeButtonClick} className={"topbar-buttons"}>Home</Button>
                <div className="topbar-right-buttons">
                    <Button onClick={sendDataToParent} className="topbar-right-button">Create Account</Button>
                    <Button className="topbar-right-button">Sign in</Button>
                </div>
            </HorizontalLayout>

        </div>

    );
}

export default Topbar