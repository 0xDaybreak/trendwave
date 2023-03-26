import Card from './Card'
import './CardHolder.css'
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";

const CardHolder = () => {

    const contentArray = [
        {name: 'Kings of Hearts', value: 10, img: 'https://preview.redd.it/4hymujkzrypa1.gif?format=mp4&v=enabled&s=b429e18253318a057c1b5b58629bbe26d2300f2d'},
        {name: 'Queen of Hearts', value: 10, img: ''},
        {name: 'Jack of Hearts', value: 10, img: ''},
        {name: 'Eight of Hearts', value: 10, img: ''},
        {name: 'Seven of Diamonds', value: 10, img: ''},
    ];


    return (
        <VerticalLayout>
            <HorizontalLayout>
                {contentArray.map((content: any) => (
                    <Card name={content.name} value={content.value} img={content.img}/>
                ))}
            </HorizontalLayout>
        </VerticalLayout>
    );

}
    export default CardHolder