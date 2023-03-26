import Card from './Card'
import './CardHolder.css'
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import {useState} from "react";

interface VideoEntity {
    id?:string;
    url?:string;
}

const CardHolder = () => {

    const[vEntity, setVEntity] = useState<VideoEntity[]>([]);

    function findAll() {
        //const entities = VideoEntityEndpoint.findAll()
    }


    const contentArray = [
        {name: 'Kings of Hearts', value: 10, img: 'https://v.redd.it/qv58i2tz82qa1/DASH_360.mp4?source=fallback'},
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