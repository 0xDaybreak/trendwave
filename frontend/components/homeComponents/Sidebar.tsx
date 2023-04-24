import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import {Button} from "@hilla/react-components/Button.js";
import './Sidebar.css';
import {useNavigate} from 'react-router-dom';

const Sidebar = ({show}:{show:boolean}) => {

    const navigate = useNavigate();

    const handleTodaysTopChange = () => {
        navigate('/top');
    };

    const handleFavouritesChange = () => {
      navigate('/favourites');
    };

    if(show) {
        return (
            <div id = "sbs" className='sb-expand min-h-screen'>
                <VerticalLayout className={"margin-left"}>
                    <div className = "category-title">
                        Menu
                    </div>
                    <Button onClick={handleTodaysTopChange} className={"sb-button"}>Today's Top</Button>
                    <Button className={"sb-button"}>Feed</Button>
                    <Button onClick={handleFavouritesChange} className={"sb-button"}>Favourites</Button>
                    <div className = "category-title">
                        Categories
                    </div>
                </VerticalLayout>
            </div>
        );
    }

    return(
        <div id = "sbs" className='sb-collapse'>
        </div>
    );
}
export default Sidebar