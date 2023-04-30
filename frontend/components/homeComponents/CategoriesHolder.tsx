import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import './CategoriesHolder.css';
import Category from "Frontend/generated/com/video/application/entity/Category";
import CategoryComp from "Frontend/components/homeComponents/CategoryComp";
import {CategoryEndpoint} from "Frontend/generated/endpoints";
import {useEffect, useState} from "react";



const CategoriesHolder = () => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        CategoryEndpoint.accessCategories()
            .then((response: (Category | undefined)[] | undefined) => {
                if (response) {
                    setCategories(response.filter(category => category !== undefined) as Category[]);
                }
            })
            .catch(error => console.error(error));
        console.log(categories);
    }, []);

    return (
        <VerticalLayout className = "category-title">
            Categories
            {categories.map(category => <CategoryComp category={category}/>)}
        </VerticalLayout>
        );
}

export default CategoriesHolder;