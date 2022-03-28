import { useState, useEffect, useRef } from "react";
import { Artwork, Dimensions } from "../../data/datatypes";
import useWindowDimensions from "../../hooks/mediaSize";
import ArtworkCard from "./artwork/artwork-card";
import style from './gallery.module.scss';
import globalStyles from '../../styles/styles.module.scss';

export default function Gallery(props: { artworks: Artwork[] | null }) {
    const { artworks } = props;
    const { width, height } = useWindowDimensions();
    const [cardsInRow, setCardsInRow] = useState(calculateCardsInRow())
    const galleryCards = [];
    const ref = useRef<HTMLHeadingElement>(null);


    function calculateCardsInRow() {
        let newCards = 4;
        if (width) {
            if (width >= parseInt(globalStyles.lgMin)) {
                newCards = 4;
            } else {
                newCards = 3;
            };
        }
        return newCards;
    };

    useEffect(() => {
        console.log('width', ref.current ? ref.current.offsetWidth : 0);
    }, [ref.current]);

    useEffect(() => {
        setCardsInRow(calculateCardsInRow());
        console.log(cardsInRow);
    }, [width]);

    useEffect(() => {
        let total = artworks?.length;
    }, [cardsInRow]);

    if (artworks) {
        const artworkCards = artworks.map(artwork => {
            return (
                <ArtworkCard data={ artwork } key={ artwork.name }></ArtworkCard>
            )
        })
        return (
            <div className={ style.container }>
                <div className={ style.content }>
                    { artworkCards }
                </div>
            </div>
        );
    }
    
    return (
        <div>
            Uh oh
        </div>
    );
};