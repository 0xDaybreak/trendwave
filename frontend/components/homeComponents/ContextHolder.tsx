import Topbar from "Frontend/components/homeComponents/Topbar";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import Sidebar from "Frontend/components/homeComponents/Sidebar";
import CardHolder from "Frontend/components/homeComponents/CardHolder";
import {useState} from "react";
import './ContextHolder.css'
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";

const ContextHolder = () => {
    const [show, setShow] = useState(true);
    const showSidebarHandler = () => {
        setShow(prevState => !prevState);
    }
    return (
        <div >
            <VerticalLayout className='context-holder-horizontal-layout'>
                <Topbar onThreeBarsMenuClick={showSidebarHandler}/>
                <HorizontalLayout>
                    <Sidebar show={show}/>
                    <CardHolder/>
                </HorizontalLayout>
            </VerticalLayout>
        </div>
    );
}

export default ContextHolder;