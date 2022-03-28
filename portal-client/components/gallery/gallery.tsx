import { useState, useEffect, useRef } from "react";
import { Artwork, Dimensions } from "../../data/datatypes";
import useWindowDimensions from "../../hooks/mediaSize";
import ArtworkCard from "./artwork/artwork-card";
import style from './gallery.module.scss';
import globalStyles from '../../styles/styles.module.scss';

export default function Gallery(props: { artworks: Artwork[] | null }) {
    const { artworks } = props;
    const { width, height } = useWindowDimensions();
    const [ cardsInRow, setCardsInRow ] = useState(calculateCardsInRow())
    const [ galleryCards, setGalleryCards ] = useState<any[]>([]);
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
        setCardsInRow(calculateCardsInRow());
        if (artworks && ref.current?.offsetWidth) {
            let totalWidth = 0;
            let maxHeight = 0;
            artworks.forEach(artwork => {
                totalWidth += artwork.width;
                maxHeight = Math.max(maxHeight, artwork.height)
            })
            let optimalHeight = Math.round(maxHeight * (ref.current.offsetWidth / totalWidth));
            const resizedGalleryCards = artworks.map(artwork => {

            })
        }
    }, [ref.current, ref.current?.offsetWidth]);

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
            <div className={ style.container } ref={ref}>
                <div className={ style.content }>
                    { galleryCards }
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