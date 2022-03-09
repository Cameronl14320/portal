import { Artwork } from "../../data/datatypes";
import ArtworkCard from "./artwork/artwork-card";
import style from './gallery.module.scss';

export default function Gallery(props: { artworks: Artwork[] | null }) {
    const { artworks } = props;
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