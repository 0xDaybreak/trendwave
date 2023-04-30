import {Button} from "@hilla/react-components/Button.js";
import './CategoryComp.css';
import React from "react";

interface CategoryProps {
    category:any;
}


const CategoryComp:React.FC<CategoryProps> = (props:CategoryProps) => {
    return(
        <>
            <Button className={"category"}>
                <span className={"category-text"}>
                    {props.category.cName}
                </span>
            </Button>
        </>
        );
}

export default CategoryComp;