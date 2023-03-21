import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import {useState} from "react";


export function Sidebar({show} : {show:boolean}){


    if(show) {
        return (
            <div id = "sbs" className='sb' style = {{width : '12%' }}>
        <VerticalLayout className={"margin-left"}>
            <div className = "category-title">
                Categories
            </div>
            <Button className={"sb-button"}>Button 1</Button>
            <Button className={"sb-button"}>Button 2</Button>
            <Button className={"sb-button"} >Button 3</Button>
            <Button className={"sb-button"}>Button 4</Button>
        </VerticalLayout>
          </div>
        );
    }


    return(
            <div id = "sbs" className='sb' style = {{width : '2%'}}>

            </div>

    );
}