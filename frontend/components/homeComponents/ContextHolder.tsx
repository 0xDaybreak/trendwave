import Topbar from "Frontend/components/homeComponents/Topbar";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import Sidebar from "Frontend/components/homeComponents/Sidebar";
import CardHolder from "Frontend/components/homeComponents/CardHolder";
import React, {useEffect, useState} from "react";
import './ContextHolder.css'
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import SignUpModal from "Frontend/components/modal/SignUpModal";
import CardHolderTop from "Frontend/components/todaysTopComponents/CardHolderTop";
import RegisterHolder from "Frontend/components/registerComponents/RegisterHolder";
import '@vaadin/vaadin-lumo-styles/utility.js';

interface ContextHolderProps {
    content?:string;
}


const ContextHolder:React.FC<ContextHolderProps> = (props:ContextHolderProps) => {
    const [show, setShow] = useState(window.innerWidth > 768);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleData = (showSignUpModal:any) => {
        setShowSignUpModal((prevState) => !prevState);
    };

    const showSidebarHandler = () => {
        setShow((prevState) => !prevState);
    };

    const handleShowModal = () => {

        setShowSignUpModal(prevState => !prevState);
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
        <div className="flex-wrap min-h-screen">
            {showSignUpModal && (
                <SignUpModal signInBtnClicked={true} title="Register or Login" handleShowModal={handleShowModal} />
            )}
            <VerticalLayout className="context-holder-vertical-layout">
                <Topbar signInBtnClicked={handleData} onThreeBarsMenuClick={showSidebarHandler} isMobile={isMobile} />
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