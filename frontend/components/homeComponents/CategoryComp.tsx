import {Button} from "@hilla/react-components/Button.js";
import './CategoryComp.css';
import React, {useState} from "react";

interface CategoryProps {
    category:any;
    onCategoryClicked:(childCategory:string)=>void;
    isSelected:boolean;
}


const CategoryComp:React.FC<CategoryProps> = (props:CategoryProps) => {

    const [category, setCategory] = useState(props.category.cName);
    const [isSelected, setIsSelected] = useState(false);

    const handleCategoryButton = () => {
        setCategory(props.category.cName);
        props.onCategoryClicked(category);
    }

    return(
        <>
            <Button onClick={handleCategoryButton} className={`category ${props.isSelected ? 'selected-category' : ''}`}>
                <span className={"category-text"}>
                    {props.category.cName}
                </span>
            </Button>
        </>
        );
}

export default CategoryComp;