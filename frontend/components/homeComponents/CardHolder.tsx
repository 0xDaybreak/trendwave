import Card from './Card';
import './CardHolder.css';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { useEffect, useState, useRef } from 'react';
import { VideoEntityEndpoint } from 'Frontend/generated/endpoints';
import VideoEntity from 'Frontend/generated/com/video/application/entity/VideoEntity';

const CardHolder = () => {

    const [vEntities, setVEntities] = useState<VideoEntity[]>([]);
    const [entityChunks, setEntityChunks] = useState<VideoEntity[][]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth * 0.8 / 4);
    const [cardsPerRow, setCardsPerRow] = useState(4);
    const myRef:any = useRef();
    const[myElementIsVisible, setMyElementISVisible] = useState<any>();

    let cardCounter = 1;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth * 0.8 / 4);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        VideoEntityEndpoint.findTwelve(0).then(setVEntities);
        myRef.current = new IntersectionObserver(row => {
            if(row[0].isIntersecting) {
                console.log("we are intersecting")
            }
        })
    }, []);

    useEffect(() => {
        const calculateCardsPerRow = () => {
            if (window.innerWidth >= 992) {
                setCardsPerRow(4);
            } else if (window.innerWidth >= 768) {
                setCardsPerRow(3);
            } else {
                setCardsPerRow(1);
            }
        };

        calculateCardsPerRow();
        window.addEventListener('resize', calculateCardsPerRow);

        return () => window.removeEventListener('resize', calculateCardsPerRow);
    }, []);

    useEffect(() => {
        const chunks = [];
        for (let i = 0; i < vEntities.length; i += cardsPerRow) {
            chunks.push(vEntities.slice(i, i + cardsPerRow));
        }
        setEntityChunks(chunks);
    }, [vEntities, cardsPerRow]);

    return (
        <VerticalLayout className="card-holder-vertical-layout">
            {entityChunks.map((chunk, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                    {cardsPerRow === 1 ? (
                        <VerticalLayout>
                            {chunk.map((entity) => (
                                <Card url={entity.url} key={cardCounter++} id={entity.id}/>
                            ))}
                        </VerticalLayout>
                    ) : (
                        <HorizontalLayout ref={cardCounter===12 ? myRef:null}>
                            {chunk.map((entity) => (
                                <Card width={windowWidth} url={entity.url} key={cardCounter++} id={entity.id}/>
                            ))}
                        </HorizontalLayout>
                    )}
                </div>
            ))}
        </VerticalLayout>
    );
};

export default CardHolder;
