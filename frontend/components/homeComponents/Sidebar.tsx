import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import './Sidebar.css';
import {useState} from "react";


const Sidebar = ({show}:{show:boolean}) => {
    if(show) {
        return (
            <div id = "sbs" className='sb-expand'>
                <VerticalLayout className={"margin-left"}>
                    <div className = "category-title">
                        Menu
                    </div>
                    <Button className={"sb-button"}>Today's Top</Button>
                    <Button className={"sb-button"}>Feed</Button>
                    <Button className={"sb-button"}>Favourites</Button>
                    <div className = "category-title">
                        Categories
                    </div>
                </VerticalLayout>
            </div>
        );
    }

    return(
            <div id = "sbs" className='sb-collapse'>
            </div>
    );
}
export default Sidebar