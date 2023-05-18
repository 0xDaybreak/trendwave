import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import './Sidebar.css';
import {useNavigate} from 'react-router-dom';
import React from "react";
import {UserEndpoint} from "Frontend/generated/endpoints";
import CategoriesHolder from "Frontend/components/homeComponents/CategoriesHolder";

interface SidebarProps {
    show:boolean;
    onFavouriteNotLoggedIn:()=>void;
    onCategoryClicked:(childCategory:string)=>void;
}


const Sidebar:React.FC<SidebarProps> = (props:SidebarProps) => {

    const navigate = useNavigate();

    const handleTodaysTopChange = () => {
        navigate('/top');
    };

    const handleFeedChange = async () => {
        if (await UserEndpoint.isLoggedIn()) {
            navigate('/feed');
        }
        else {
            props.onFavouriteNotLoggedIn();
        }
    }

    const handleFavouritesChange = async () => {
        if (await UserEndpoint.isLoggedIn()) {
            navigate('/favourites');
        }
        else {
            props.onFavouriteNotLoggedIn();
        }
    };

    if(props.show) {
        return (
            <div id = "sbs" className='sb-expand min-h-screen'>
                <VerticalLayout className={"margin-left"}>
                    <div className = "category-title">
                        Menu
                    </div>
                    <Button onClick={handleTodaysTopChange} className={"sb-button"}>Today's Top</Button>
                    <Button onClick={handleFeedChange} className={"sb-button"}>Feed</Button>
                    <Button onClick={handleFavouritesChange} className={"sb-button"}>Favourites</Button>
                    <hr className={"hr-sb"}></hr>
                    <CategoriesHolder onCategoryClicked={props.onCategoryClicked}/>
                </VerticalLayout>
            </div>
        );
    }

    return(
        <div className='sb-collapse'>

        </div>
    );
}
export default Sidebar