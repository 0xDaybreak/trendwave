import Card from './Card';
import './CardHolder.css';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { useEffect, useState } from 'react';
import { VideoEntityEndpoint } from 'Frontend/generated/endpoints';
import VideoEntity from 'Frontend/generated/com/video/application/entity/VideoEntity';

const CardHolder = () => {
    const [vEntities, setVEntities] = useState<VideoEntity[]>([]);
    const [entityChunks, setEntityChunks] = useState<VideoEntity[][]>([]);

    useEffect(() => {
        VideoEntityEndpoint.findAll().then(setVEntities);
    }, []);

    useEffect(() => {
        const chunks = [];
        for (let i = 0; i < vEntities.length; i += 5) {
            chunks.push(vEntities.slice(i, i + 5));
        }
        setEntityChunks(chunks);
    }, [vEntities]);

    const isMobile = window.innerWidth < 768; // Check if device is mobile

    return (
        <VerticalLayout>
            {entityChunks.map((chunk, index) => (
                // Conditionally render a VerticalLayout with one card per row when on mobile,
                // and a HorizontalLayout with multiple cards per row when not on mobile.
                isMobile ? (
                    <VerticalLayout key={index}>
                        {chunk.map((entity) => <Card url={entity.url} />)}
                    </VerticalLayout>
                ) : (
                    <HorizontalLayout key={index}>
                        {chunk.map((entity) => <Card url={entity.url} />)}
                    </HorizontalLayout>
                )
            ))}
        </VerticalLayout>
    );
};

export default CardHolder;
