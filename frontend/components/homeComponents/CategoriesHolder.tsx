import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import './CategoriesHolder.css';
import Category from "Frontend/generated/com/video/application/entity/Category";
import CategoryComp from "Frontend/components/homeComponents/CategoryComp";
import {CategoryEndpoint} from "Frontend/generated/endpoints";
import React, {useEffect, useState} from "react";

interface CategoriesHolder {
    onCategoryClicked:(childCategory:string)=>void;
}

const CategoriesHolder:React.FC<CategoriesHolder> = (props:CategoriesHolder) => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        CategoryEndpoint.accessCategories()
            .then((response: (Category | undefined)[] | undefined) => {
                if (response) {
                    setCategories(response.filter(category => category !== undefined) as Category[]);
                }
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <VerticalLayout className = "category-title">
            Categories
            {categories.map((category,index) => <CategoryComp key={index} category={category} onCategoryClicked={props.onCategoryClicked}/>)}
        </VerticalLayout>
        );
}

export default CategoriesHolder;