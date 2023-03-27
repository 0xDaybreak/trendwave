import './CardStatusBar.css'
import Like from "Frontend/components/homeComponents/cardStatusComponents/Like";
import Favourite from "Frontend/components/homeComponents/cardStatusComponents/Favourite";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";

const CardStatusBar = () => {
    return (
      <div className="card-status">
          <HorizontalLayout>
              <Like/>
              <Favourite/>
          </HorizontalLayout>

      </div>
    );
}

export default CardStatusBar