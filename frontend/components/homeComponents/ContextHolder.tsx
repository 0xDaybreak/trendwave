import Topbar from "Frontend/components/homeComponents/Topbar";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import Sidebar from "Frontend/components/homeComponents/Sidebar";
import CardHolder from "Frontend/components/homeComponents/CardHolder";
import React, {useEffect, useState} from "react";
import './ContextHolder.css'
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import SignInModal from "Frontend/components/modal/SignInModal";
import CardHolderTop from "Frontend/components/todaysTopComponents/CardHolderTop";
import RegisterHolder from "Frontend/components/registerComponents/RegisterHolder";
import '@vaadin/vaadin-lumo-styles/utility.js';
import {openNotification} from "Frontend/components/Notification";


interface ContextHolderProps {
    content?:string;
}


const ContextHolder:React.FC<ContextHolderProps> = (props:ContextHolderProps) => {
    const [show, setShow] = useState(window.innerWidth > 768);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLoggedIn"));

    function handleLogin() {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        openNotification("Logged In successfully", "middle");
    }

    function handleLogout() {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        openNotification("Logged out", "middle");
    }

    const handleData = () => {
        setShowSignInModal((prevState) => !prevState);
    };

    const showSidebarHandler = () => {
        setShow((prevState) => !prevState);
    };

    const handleShowModal = () => {

        setShowSignInModal(prevState => !prevState);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShow(false);
                setIsMobile(true);
            } else {
                setIsMobile(false);
                setShow(true);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="big-div">

            {showSignInModal && (
                <SignInModal signInBtnClicked={true} title="Log In" handleShowModal={handleShowModal}  onLogin={handleLogin} />
            )}

            <VerticalLayout className="min-h-screen">
                <Topbar isLoggedIn={isLoggedIn} onLogout={handleLogout} signInBtnClicked={handleData} onThreeBarsMenuClick={showSidebarHandler} isMobile={isMobile}/>

                <HorizontalLayout className="context-holder-horizontal-layout">
                    <Sidebar show={show} />
                    {(() => {
                        switch (props.content) {
                            case 'top':
                                return <CardHolderTop />;
                            case 'register':
                                return <RegisterHolder />;
                            default:
                                return <CardHolder />;
                        }
                    })()}
                </HorizontalLayout>
            </VerticalLayout>
        </div>
    );

};

export default ContextHolder;