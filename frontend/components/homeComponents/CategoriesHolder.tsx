import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import './CategoriesHolder.css';
import Category from "Frontend/components/homeComponents/Category";

const CategoriesHolder = () => {
    return (
        <VerticalLayout className = "category-title">
            Categories
            <Category/>
        </VerticalLayout>
        );
}

export default CategoriesHolder;