import { useState, useEffect, useRef } from "react";
import { Artwork } from "../../data/datatypes";
import useWindowDimensions from "../../hooks/mediaSize";
import ArtworkCard from "./artwork/artwork-card";
import style from './gallery.module.scss';
import globalStyles from '../../styles/styles.module.scss';

export default function Gallery(props: { artworks: Artwork[] | null }) {
    const { artworks } = props;
    const [ galleryCards, setGalleryCards ] = useState<any[]>([]);
    const ref = useRef<HTMLHeadingElement>(null);

    if (artworks) {
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