import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import {GoThreeBars} from "react-icons/go";
import 'Frontend/themes/my-app/styles.css';
import {useState} from "react";

export function Sidebar() {

    const [show, setShow] = useState(true);

    function showSidebar() {
        if(show) {
            setShow(false);
            const myNode = document.getElementById("sbs");
            if(myNode!=null){
            myNode.innerHTML = '';
            }
        }
        else {
            setShow(true);
        }
    }

    return(
        <div>
      <VerticalLayout id="sbs" className = "sb" style = {{width: show ? '15%' : '2%'}} >
          <GoThreeBars className="menubars" onClick={showSidebar}/>
          <Button className={"sidebar-button"}>Button 1</Button>
          <Button className={"sidebar-button"}>Button 2</Button>
          <Button className={"sidebar-button"}>Button 3</Button>
      </VerticalLayout>
      </div>
    );
}