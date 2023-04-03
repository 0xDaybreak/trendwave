import Topbar from "Frontend/components/homeComponents/Topbar";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import Sidebar from "Frontend/components/homeComponents/Sidebar";
import CardHolder from "Frontend/components/homeComponents/CardHolder";
import React, {useEffect, useState} from "react";
import './ContextHolder.css'
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import SignUpModal from "Frontend/components/modal/SignUpModal";
const ContextHolder = () => {
    const [show, setShow] = useState(true);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleData = (showSignUpModal:any) => {
        setShowSignUpModal((prevState) => !prevState);
        console.log(showSignUpModal);
    };

    const showSidebarHandler = () => {
        setShow((prevState) => !prevState);
    };

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
        <div>
            {showSignUpModal && (
                <SignUpModal signUpBtnClicked={true} title="Register or Login" onClose="test" />
            )}
            <VerticalLayout className="context-holder-vertical-layout">
                <Topbar onSignUpBtnClick={handleData} onThreeBarsMenuClick={showSidebarHandler} isMobile={isMobile} />
                <HorizontalLayout>
                    <Sidebar show={show} />
                    <CardHolder />
                </HorizontalLayout>
            </VerticalLayout>
        </div>
    );
};

export default ContextHolder;