import Topbar from "Frontend/components/homeComponents/Topbar";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import Sidebar from "Frontend/components/homeComponents/Sidebar";
import CardHolder from "Frontend/components/homeComponents/CardHolder";
import React, {useState} from "react";
import './ContextHolder.css'
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import SignUpModal from "Frontend/components/modal/SignUpModal";

const ContextHolder = () => {
    const [show, setShow] = useState(false);

    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const handleData = (showSignUpModal:any) => {
        setShowSignUpModal(prevState => !prevState);
        console.log(showSignUpModal);
        //this is a comment
    }

    const showSidebarHandler = () => {
        setShow(prevState => !prevState);

    }
    return (
        <div className='context-holder-horizontal-layout' >
            {showSignUpModal && (
                <SignUpModal
                    signUpBtnClicked={true}
                    title="Register or Login"
                    onClose="test"
                />)}
            <VerticalLayout >
                <Topbar onSignUpBtnClick={handleData} onThreeBarsMenuClick={showSidebarHandler}/>
                <HorizontalLayout>
                    <Sidebar show={show}/>
                    <CardHolder/>
                </HorizontalLayout>
            </VerticalLayout>
        </div>
    );
}

export default ContextHolder;