import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import {GoThreeBars} from "react-icons/go";
import './Topbar.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {logout} from "@hilla/frontend";
import {isLoggedIn, loginImpl, logoutImpl} from "Frontend/auth/auth";
import {openNotification} from "Frontend/components/Notification";

interface TopbarProps {
    onThreeBarsMenuClick: any;
    signInBtnClicked: any;
    isMobile: boolean;
    isLoggedIn: boolean;
    isLoading: boolean;
    onLogout: () => void;
}

const Topbar: React.FC<TopbarProps> = (props: TopbarProps) => {

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
    const [showSignUpModal, setShowSignUpModal] = useState(true)

    const handleLogoutBtnClick = () => {
        props.onLogout();
        navigate("/");
        window.location.reload();
    };

    const handleSignInBtnClick = () => {
        setShowSignUpModal((prevState: boolean) => (!prevState));
        props.signInBtnClicked(showSignUpModal)
    }

    const [mobileState, setMobileState] = useState(props.isMobile);

    useEffect(() => {
        setMobileState(props.isMobile);
    }, [props.isMobile]);

    useEffect(() => {
    }, [props.isLoggedIn]);


    return (
        <div className="tb">
            <HorizontalLayout>
                <GoThreeBars className={'menubars'} onClick={props.onThreeBarsMenuClick}/>
                <Button onClick={handleHomeButtonClick} className={"topbar-buttons"}>Home</Button>
                <div className="topbar-right-buttons">
                    {props.isLoggedIn ?
                        <Button onClick={() => logout().then(() => handleLogoutBtnClick()).then(() => logoutImpl())}
                                className="topbar-right-button">Log out</Button> :
                        <>{props.isLoading ?

                            <div className={"topbar-right-button"}>Loading... </div>
                            : <> <Button onClick={handleSignUpBtnClick} className="topbar-right-button">Create
                                Account</Button>
                                <Button onClick={sendDataToContextHolder} className="topbar-right-button">Sign
                                    in</Button></>
                        }

                        </>

                    }

                </div>
            </HorizontalLayout>

        </div>

    );
}

export default Topbar