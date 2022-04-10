import { Artwork } from "../../../data/datatypes";
import Card from "../../card/card";
import style from './artwork-card.module.scss';
import globalStyles from '../../../styles/styles.module.scss';
import Image from "next/image";

export default function ArtworkCard(props: { data: Artwork | null, }) {
    if (props.data) {
        const artwork = props.data;
        return (
            <Card>
                <div className={ style.container }>
                    
                </div>
            </Card>
        )
    }

    return (
        <div>
            Loading;
        </div>
    )
}