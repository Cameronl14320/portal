import { Artwork } from "../../../data/datatypes";
import Card from "../../card/card";
import style from './artwork-card.module.scss';
import globalStyles from '../../../styles/styles.module.scss';

export default function ArtworkCard(props: { data: Artwork | null }) {
    if (props.data) {
        const artwork = props.data;
        return (
            <Card style={{ marginBottom: globalStyles.portalDoubleUnit, width: '100%', height: '100%' }}>
                <div className={ style.container }>
                    <div className= { style.content }>
                        <div>{ artwork.name }</div>
                        <div>{ artwork.description }</div>
                        <div>{ artwork.url }</div>
                    </div>
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