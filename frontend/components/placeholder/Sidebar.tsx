import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import {Button} from "@hilla/react-components/Button.js";

export function Sidebar({show} : {show:boolean}){

    const collapseSidebar = () => {
        if (!show) {
            const myNode = document.getElementById("sbs");
            if (myNode != null) {
                myNode.innerHTML = '';
            }
        }
    }

    return(

        <div id = "sbs" className='sb' style = {{width : show ? '12%' : '2%'}}>
            <>
            <VerticalLayout className={"margin-left"}>
                <div className = "category-title">
                    Categories
                </div>
                <Button className={"sb-button"}>Button 1</Button>
                <Button className={"sb-button"}>Button 2</Button>
                <Button className={"sb-button"} >Button 3</Button>
                <Button className={"sb-button"}>Button 4</Button>
            </VerticalLayout>
                {collapseSidebar()}
            </>
        </div>

    );
}