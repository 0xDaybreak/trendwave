import Card from './Card';
import './CardHolder.css';
import {HorizontalLayout} from '@hilla/react-components/HorizontalLayout.js';
import {VerticalLayout} from '@hilla/react-components/VerticalLayout.js';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {VideoEntityEndpoint} from 'Frontend/generated/endpoints';
import VideoEntity from 'Frontend/generated/com/video/application/entity/VideoEntity';
import PopupVideo from "Frontend/components/popupvideo/PopupVideo";

interface CardHolderProps {
    content?: string;
    onFavouriteNotLoggedIn: () => void;
}


const CardHolder:React.FC<CardHolderProps> = (props:CardHolderProps) => {

    const [vEntities, setVEntities] = useState<VideoEntity[]>([]);
    const [entityChunks, setEntityChunks] = useState<VideoEntity[][]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth * 0.8 / 4);
    const [cardsPerRow, setCardsPerRow] = useState(4);
    const [pageNr, setPageNr] = useState(0);
    const [isPopUpShow, setPopUpShow] = useState<boolean>(false);
    const [entityUrl, setEntityUrl] = useState('');
    const [entityAudio, setEntityAudio] = useState('');

    const handleCardClick = (state:boolean, entityUrl:string, entityAudio:string) => {
        setPopUpShow(state);
        setEntityUrl(entityUrl);
        setEntityAudio(entityAudio);
    }

    const myRef:any = useRef(null);
    const lastCard = useCallback(
        (node: any) => {
            if (!node) return;
            if (myRef.current) myRef.current.disconnect();
            myRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPageNr(prevState => prevState+1)
                }
            }, { threshold: 0.88 });
            myRef.current.observe(node);
        }, []
    );

    let cardCounter = 1;

    useEffect(() => {
        const handleResize = () => {setWindowWidth(window.innerWidth * 0.8 / 4)};
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getFilteredContent = (category: string) => {
        VideoEntityEndpoint.filterEntities(category, pageNr, 8).then((newVEntities: any) => {
            if (pageNr === 0) {
                setVEntities(newVEntities);
            } else {
                setVEntities((prevVEntities) => [...prevVEntities, ...newVEntities]);
            }
        });
    };

    const getTodaysTopContent = () => {
        VideoEntityEndpoint.findTodaysTop(pageNr,8).then((newVEntities:any) =>
            setVEntities((prevVEntities) => [...prevVEntities, ...newVEntities])
        );
    }

    const getFavouritesContent = () => {
        VideoEntityEndpoint.getFavourites(pageNr,8).then((newVEntities:any) =>
            setVEntities((prevVEntities) => [...prevVEntities, ...newVEntities])
        );
    }

    const isFavourite = useCallback(async (id: string | undefined): Promise<boolean> => {
        return await VideoEntityEndpoint.isVideoFavourite(id);
    }, []);

    useEffect(() => {
        setPageNr(0);
        setVEntities([]);
    }, [props.content]);

    useEffect(() => {
            switch (props.content) {
                case 'top':
                    getTodaysTopContent();
                    break;
                case 'favourites':
                    getFavouritesContent();
                    break;
                default:
                    getFilteredContent(props.content || '');
                    break;
            }
    }, [pageNr, props.content]);

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
            {isPopUpShow ? <PopupVideo onCardClick={handleCardClick} url={entityUrl} audio={entityAudio}/> : null}
            {entityChunks.map((chunk, index) => (
                <div key={index} className='margin-bottom'>
                    {cardsPerRow === 1 ? (
                        <VerticalLayout className={"margin-mobile"} ref={lastCard}>
                            {chunk.map((entity) => (
                                <Card onCardClick={handleCardClick}  onFavouriteNotLoggedIn={props.onFavouriteNotLoggedIn}
                                      post={entity.post} url={entity.url} audio={entity.audio}
                                      key={cardCounter++} id={entity.id} tags={entity.tags} subreddit={entity.subreddit} isFavourite={isFavourite}/>
                            ))}
                        </VerticalLayout>
                    ) : (
                        <HorizontalLayout className={"margin"} ref={lastCard}>
                            {chunk.map((entity) => (
                                <Card onCardClick={handleCardClick} onFavouriteNotLoggedIn={props.onFavouriteNotLoggedIn}
                                      width={windowWidth} post={entity.post} url={entity.url} audio={entity.audio}
                                      key={cardCounter++} id={entity.id} tags={entity.tags} subreddit={entity.subreddit} isFavourite={isFavourite}/>
                            ))}
                        </HorizontalLayout>
                    )}
                </div>
            ))}
        </VerticalLayout>
    );
};

export default CardHolder;
