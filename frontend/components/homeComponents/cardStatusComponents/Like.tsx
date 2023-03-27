import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart } from "@fortawesome/free-solid-svg-icons";
import './Like.css'

const Like = () => {
    return (
        <button className="like-button">
            <FontAwesomeIcon icon={faHeart } />
            <span>Like</span>
        </button>
    );
};

export default Like;