import {Button} from "@hilla/react-components/Button.js";
import './CategoryComp.css';
import React from "react";

interface CategoryProps {
    category:any;
    onCategoryClicked:(childCategory:string)=>void;
}


const CategoryComp:React.FC<CategoryProps> = (props:CategoryProps) => {
    const handleCategoryButton = () => {
        props.onCategoryClicked(props.category.cName);
    }
    return(
        <>
            <Button onClick={handleCategoryButton} className={"category"}>
                <span className={"category-text"}>
                    {props.category.cName}
                </span>
            </Button>
        </>
        );
}

export default CategoryComp;