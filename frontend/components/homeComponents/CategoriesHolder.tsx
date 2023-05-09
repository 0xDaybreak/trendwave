import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import './CategoriesHolder.css';
import Category from "Frontend/generated/com/video/application/entity/Category";
import CategoryComp from "Frontend/components/homeComponents/CategoryComp";
import { CategoryEndpoint } from "Frontend/generated/endpoints";
import React, { useEffect, useState } from "react";

interface CategoriesHolderProps {
    onCategoryClicked: (childCategory: string) => void;
}

const CategoriesHolder: React.FC<CategoriesHolderProps> = (props: CategoriesHolderProps) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    const handleCategoryClicked = (childCategory: string) => {
        props.onCategoryClicked(childCategory);
        setSelectedCategory(childCategory);
    }

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
        <VerticalLayout className="category-title">
            Categories
            {categories.map((category, index) =>
                <CategoryComp
                    key={index}
                    category={category}
                    onCategoryClicked={handleCategoryClicked}
                    isSelected={category.cName === selectedCategory}
                />
            )}
        </VerticalLayout>
    );
}

export default CategoriesHolder;
