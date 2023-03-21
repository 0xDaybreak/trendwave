import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import {GoThreeBars} from "react-icons/go";
import 'Frontend/themes/my-app/styles.css';
import {useState} from "react";
import {Sidebar} from "Frontend/components/placeholder/Sidebar.js";

export function Topbar(){

    const [show, setShow] = useState(true);
    const showSidebarHandler = () => {
        setShow(prevState => !prevState);
    }
    return(
        <div>

      <HorizontalLayout className = "tb" >
          <GoThreeBars className="menubars" onClick={showSidebarHandler}/>
          <Button className={"topbar-buttons"}>Home</Button>
          <div className="topbar-right-buttons">
              <Button className="topbar-right-button">Button 2</Button>
              <Button className="topbar-right-button">Button 3</Button>
          </div>
      </HorizontalLayout>
            <Sidebar show = {show}/>
      </div>

    );
}