import Topbar from "Frontend/components/homeComponents/Topbar";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import Sidebar from "Frontend/components/homeComponents/Sidebar";
import CardHolder from "Frontend/components/homeComponents/CardHolder";
import React, {useEffect, useState} from "react";
import './ContextHolder.css'
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import SignInModal from "Frontend/components/modal/SignInModal";
import RegisterHolder from "Frontend/components/registerComponents/RegisterHolder";
import '@vaadin/vaadin-lumo-styles/utility.js';
import {openNotification} from "Frontend/components/Notification";
import {UserEndpoint} from "Frontend/generated/endpoints";


interface ContextHolderProps {
    content?:string;
}


const ContextHolder:React.FC<ContextHolderProps> = (props:ContextHolderProps) => {
    const [show, setShow] = useState(window.innerWidth > 768);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function handleLogin() {
        setIsLoggedIn(true);
        openNotification("Logged In successfully", "middle");
    }

    function handleLogout() {
        setIsLoggedIn(false);
        openNotification("Logged out", "middle");
    }

    const showSidebarHandler = () => {
        setShow((prevState) => !prevState);
    };

    const handleShowModal = () => {
        setShowSignInModal(prevState => !prevState);
    }

    useEffect(() => {
        async function checkLoginStatus() {
            const loggedIn = await UserEndpoint.isLoggedIn();
            setIsLoggedIn(loggedIn);
            setIsLoading(false);
        }

        checkLoginStatus();
    }, []);

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
                <SignInModal signInBtnClicked={true} title="Log In" handleShowModal={handleShowModal}  onLogin={handleLogin}/>
            )}

            <VerticalLayout className="min-h-screen">
                <Topbar isLoggedIn={isLoggedIn} onLogout={handleLogout} signInBtnClicked={handleShowModal} onThreeBarsMenuClick={showSidebarHandler} isMobile={isMobile}  isLoading={isLoading}/>
                <HorizontalLayout className="min-w-full">
                    <Sidebar show={show} onFavouriteNotLoggedIn={handleShowModal} />
                    {(() => {
                        switch (props.content) {
                            case 'register':
                                return <RegisterHolder />;
                            default:
                                return <CardHolder onFavouriteNotLoggedIn={handleShowModal} content={props.content}/>;
                        }
                    })()}
                </HorizontalLayout>
            </VerticalLayout>
        </div>
    );

};

export default ContextHolder;