import Card from './Card'
import './CardHolder.css'
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import {useEffect, useState} from "react";
import {VideoEntityEndpoint} from "Frontend/generated/endpoints";
import VideoEntity from "Frontend/generated/com/video/application/entity/VideoEntity";

const CardHolder = () => {

    const[vEntities, setVEntities] = useState<VideoEntity[]>([]);

    useEffect(()=>{
        VideoEntityEndpoint.findAll().then(setVEntities);
    },[]);

    const get = () => {
        VideoEntityEndpoint.findAll().then(setVEntities);
        console.log(vEntities);
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
                <button onClick={get}>

                </button>
                {contentArray.map((content: any) => (
                    <Card name={content.name} value={content.value} img={content.img}/>
                ))}
            </HorizontalLayout>
        </VerticalLayout>
    );

}
    export default CardHolder