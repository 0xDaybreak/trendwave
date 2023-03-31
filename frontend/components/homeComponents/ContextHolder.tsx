import Topbar from "Frontend/components/homeComponents/Topbar";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import Sidebar from "Frontend/components/homeComponents/Sidebar";
import CardHolder from "Frontend/components/homeComponents/CardHolder";
import React, {useState} from "react";
import './ContextHolder.css'
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import SignUpModal from "Frontend/components/modal/SignUpModal";

const ContextHolder = () => {
    const [show, setShow] = useState(true);

    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const handleData = (showSignUpModal:any) => {
        setShowSignUpModal(prevState => !prevState);
        console.log(showSignUpModal);
    }

    const showSidebarHandler = () => {
        setShow(prevState => !prevState);

    }
    return (
        <div>
            {showSignUpModal && (
                <SignUpModal
                    signUpBtnClicked={true}
                    title="Register or Login"
                    onClose="test"
                />)}
            <VerticalLayout className='context-holder-horizontal-layout'>
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