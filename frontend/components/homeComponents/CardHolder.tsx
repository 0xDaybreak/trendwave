import Card from './Card'
import './CardHolder.css'
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";

const CardHolder = () => {

    const contentArray = [
        {name:'Kings of Hearts', value: 10, img:''},
        {name:'Queen of Hearts', value: 10, img:''},
        {name:'Jack of Hearts', value: 10, img:''},
    ];


    return (
        <VerticalLayout>
            <HorizontalLayout>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </HorizontalLayout>
        </VerticalLayout>
    );
}

export default CardHolder