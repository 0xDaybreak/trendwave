import Topbar from "Frontend/components/homeComponents/Topbar";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import Sidebar from "Frontend/components/homeComponents/Sidebar";
import CardHolderTop from "Frontend/components/todaysTopComponents/CardHolderTop";
import React, {useEffect, useState} from "react";
import 'Frontend/components/homeComponents/ContextHolder.css'
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import SignUpModal from "Frontend/components/modal/SignUpModal";

const ContextHolderTop = () => {
    const [show, setShow] = useState(window.innerWidth > 768);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleData = (showSignUpModal:any) => {
        setShowSignUpModal((prevState) => !prevState);
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
        <div className="big-div">
            {showSignUpModal && (
                <SignUpModal signUpBtnClicked={true} title="Register or Login" onClose="test" />
            )}
            <VerticalLayout className="context-holder-vertical-layout">
                <Topbar onSignUpBtnClick={handleData} onThreeBarsMenuClick={showSidebarHandler} isMobile={isMobile} />
                <HorizontalLayout className="context-holder-horizontal-layout">
                    <Sidebar show={show} />
                    <CardHolderTop />
                </HorizontalLayout>
            </VerticalLayout>
        </div>
    );
};

export default ContextHolderTop;