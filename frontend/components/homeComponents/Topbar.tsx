import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import {GoThreeBars} from "react-icons/go";
import './Topbar.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {logout} from "@hilla/frontend";
import { isLoggedIn, loginImpl, logoutImpl } from "Frontend/auth/auth";

interface TopbarProps {
    onThreeBarsMenuClick:any;
    signInBtnClicked:any;
    isMobile: boolean;
}

const Topbar:React.FC<TopbarProps> = (props:TopbarProps) => {

    const navigate = useNavigate();

    const handleHomeButtonClick = () => {
        navigate('/');
    };
    const handleSignUpBtnClick = () => {
        navigate('/register');
    };

    const sendDataToContextHolder = () => {
        handleSignInBtnClick();
    }
    const[showSignUpModal, setShowSignUpModal] = useState(true)

    const handleSignInBtnClick = () => {
        setShowSignUpModal((prevState:boolean) => (!prevState));
        props.signInBtnClicked(showSignUpModal)
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
                    {isLoggedIn? <Button onClick={() => logout().then(()=>navigate("/")).then(()=>logoutImpl())}
                                         className="topbar-right-button" >Log out</Button> :
                        <>
                            <Button onClick={handleSignUpBtnClick} className="topbar-right-button">Create Account</Button>
                            <Button onClick={sendDataToContextHolder} className="topbar-right-button">Sign in</Button>
                        </>

                    }

                </div>
            </HorizontalLayout>

        </div>

    );
}

export default Topbar