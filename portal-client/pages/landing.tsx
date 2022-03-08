import style from './landing.module.scss';
import Card from '../components/card/card';
import globalStyles from '../styles/styles.module.scss';
import Image from 'next/image';

const landingCardStyle = {
    width: '100%'
};

function Landing(props: any) {
    const profileCardTitle = 'Who am I?';
    const profileCardDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat vel ipsum facilisis tristique. Sed mattis nisl eu erat finibus blandit. Nullam fringilla sodales nunc eget euismod. Fusce a enim volutpat, efficitur neque posuere, euismod leo. Integer aliquam, libero quis convallis tristique, ligula justo consectetur sapien, ac condimentum purus enim a erat. Sed rutrum sagittis ante eget tristique. Integer tincidunt elit vel purus iaculis, a tincidunt est rhoncus. Maecenas metus augue, molestie et urna quis, tempor commodo tortor.';

    return (
        <div className={ style.container }>
            <div className='margin-container'>
                <div className={ style.pageTitle }>
                    Header 1
                </div>
                <div className={ style.content }>
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
                </div>
            </div>
        </div>
    )
}

export default Landing;