import Card from './Card'
import './CardHolder.css'
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout.js";
import {VerticalLayout} from "@hilla/react-components/VerticalLayout.js";
import {useEffect, useState} from "react";
import {VideoEntityEndpoint} from "Frontend/generated/endpoints";
import VideoEntity from "Frontend/generated/com/video/application/entity/VideoEntity";

const CardHolder = () => {
    const [vEntities, setVEntities] = useState<VideoEntity[]>([]);
    const [entityChunks, setEntityChunks] = useState<VideoEntity[][]>([]);

    useEffect(() => {
        VideoEntityEndpoint.findAll().then(setVEntities);
    }, []);

    useEffect(() => {
        const chunks = [];
        for (let i = 0; i < vEntities.length; i += 4) {
            chunks.push(vEntities.slice(i, i + 4));
        }
        setEntityChunks(chunks);
    }, [vEntities]);

    return (
        <VerticalLayout>
            {entityChunks.map((chunk, index) => (
                <HorizontalLayout key={index}>
                    {chunk.map(entity => (
                        <Card url={entity.url}/>
                    ))}
                </HorizontalLayout>
            ))}
        </VerticalLayout>
    );

}

export default CardHolder;
