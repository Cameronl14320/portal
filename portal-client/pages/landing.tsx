import style from './landing.module.scss';
import Card from '../components/card/card';
import Stripe from '../components/stripe/stripe';
import globalStyles from '../styles/styles.module.scss';
import Image from 'next/image';
import { getData } from './api/art';
import { useEffect, useState } from 'react';
import Gallery from '../components/gallery/gallery';
import { Artwork } from '../data/datatypes';

const landingCardStyle = {
    width: '100%'
};

export default function Landing(props: any) {
    const profileCardTitle = 'Who am I?';
    const profileCardDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat vel ipsum facilisis tristique. Sed mattis nisl eu erat finibus blandit. Nullam fringilla sodales nunc eget euismod. Fusce a enim volutpat, efficitur neque posuere, euismod leo. Integer aliquam, libero quis convallis tristique, ligula justo consectetur sapien, ac condimentum purus enim a erat. Sed rutrum sagittis ante eget tristique. Integer tincidunt elit vel purus iaculis, a tincidunt est rhoncus. Maecenas metus augue, molestie et urna quis, tempor commodo tortor.';
    
    const [artworks, setArtworks] = useState<Artwork[] | null>(null);

    useEffect(() => {
        fetch('api/art')
            .then((res) => res.json())
            .then((data) => data.artworks)
            .then((data: Artwork[]) => {
                setArtworks(data);
            });
    }, []);

    return (
        <div className={ style.container }>
            <div className={ style.content }>
                <div className='margin-container'>
                    <div className={ style.pageTitle } style={{ color: globalStyles.starlightBase }}>
                        Card + Stripe Component
                    </div>
                </div>
                <Stripe backgroundColor={ globalStyles.shadowDark }>
                    <Card style={ landingCardStyle }>
                        <div className={ style.profileCard }>
                            <div className={ style.profileCardPrimary}>
                                <div className={ style.profileCardInfo } style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <div className= { style.profileCardImage }>
                                        <Image src='http://placekitten.com/300/300' alt='profile card image' width='150px' height='150px' layout='responsive'></Image>
                                    </div>
                                </div>
                            </div>
                            <div className={ style.profileCardSecondary }>
                                <div className={ style.profileCardInfo }>
                                    <div className={ style.subtitle }>
                                        <div className='subtitle'>{ profileCardTitle }</div>
                                    </div>
                                    <div>
                                        { profileCardDescription }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Stripe>
                <div className='margin-container'>
                    <div className={ style.pageTitle } style={{ color: globalStyles.starlightBase }}>
                        Art Gallery
                    </div>
                </div>
                <Stripe backgroundColor={ globalStyles.shadowDark }>
                    <Gallery artworks={ artworks }></Gallery>
                </Stripe>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const data = await getData();

    return { props: { data } }
}