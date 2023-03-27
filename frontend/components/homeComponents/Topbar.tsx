import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import {GoThreeBars} from "react-icons/go";
import './Topbar.css';

const Topbar = ({onThreeBarsMenuClick}:{onThreeBarsMenuClick:any}) => {


    return (
        <div className="tb">
            <HorizontalLayout >
                <GoThreeBars className="menubars" onClick={onThreeBarsMenuClick}/>
                <Button className={"topbar-buttons"}>Home</Button>
                <div className="topbar-right-buttons">
                    <Button className="topbar-right-button">Create Account</Button>
                    <Button className="topbar-right-button">Sign in</Button>
                </div>
            </HorizontalLayout>

        </div>

    );
}

export default Topbar