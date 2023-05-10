import { Button } from "@hilla/react-components/Button.js";
import './CategoryComp.css';
import React, { useEffect, useState } from "react";

interface CategoryProps {
    category: any;
    onCategoryClicked: (childCategory: string) => void;
    isSelected: boolean;
}

const CategoryComp: React.FC<CategoryProps> = (props: CategoryProps) => {
    const handleCategoryButton = () => {
        props.onCategoryClicked(props.category.cName);
    }
    return (
        <Button onClick={handleCategoryButton} className={`category ${props.isSelected ? 'selected-category' : ''}`}>
            <span className={"category-text"}>
                {props.category.cName}
            </span>
        </Button>
    );
}

export default CategoryComp;
