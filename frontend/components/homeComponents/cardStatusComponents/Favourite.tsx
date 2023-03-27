import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import "./Favourite.css";

const Favourite = () => {
    return (
        <div className="favourite-container">
        <FontAwesomeIcon icon={faBookmark} className="favourite-icon " />
        </div>
    );
}

export default Favourite;
