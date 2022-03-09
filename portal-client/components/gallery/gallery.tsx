import { Artwork } from "../../data/datatypes";

export default function Gallery(props: { artworks: Artwork[] | null }) {
    const { artworks } = props;
    if (artworks) {
        console.log(artworks);
        // const artworkCards = artworks.forEach(artwork => {
        //     console.log(artwork);
        // });
        return (
            <div>
                Loaded
            </div>
        );
    }
    
    return (
        <div>
            Uh oh
        </div>
    );
};