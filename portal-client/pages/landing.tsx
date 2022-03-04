import style from './landing.module.scss';
import Card from '../components/card/card';
import colors from '../styles/styles.module.scss';
import Image from 'next/image';

const landingCardStyle = {
    width: '100%'
};

function Landing(props: any) {
    return (
        <div className={ style.container }>
            <div className='margin-container'>
                <div className={ style.content }>
                    <Card style={ landingCardStyle }>
                        <div className={ style.profileCard }>
                            <div className={ style.profileCardPrimary}>
                                <div className={ style.profileCardInfo }>
                                    <Image src='http://placekitten.com/300/300' width='200px' height='300px' layout="responsive"></Image>
                                </div>
                            </div>
                            <div className={ style.profileCardSecondary }>
                                <div className={ style.profileCardInfo }>
                                    <div className={ style.subtitle }>
                                        <div className='subtitle'>Introduction</div>
                                    </div>
                                    <div>
                                        Full stack developer with experience in Angular, React, Java, and Sass.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Landing;