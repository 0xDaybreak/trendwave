import ContextHolder from "Frontend/components/homeComponents/ContextHolder";
import {useParams} from "react-router-dom";


const FilteredView = () => {
    const { category } = useParams<{ category: string }>();
    return (
        <ContextHolder content={category}/>
        )
}

export default FilteredView;