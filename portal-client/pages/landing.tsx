import style from './landing.module.scss';
import Card from '../components/card/card';
import colors from '../styles/styles.module.scss';

const landingCardStyle = {
    backgroundColor: colors.starlightBase,
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
                                
                            </div>
                            <div className={ style.profileCardSecondary }>
                                <div className={ style.profileCardInfo }>
                                    <div className='subtitle'>Introduction</div>
                                    <div>
                                        Full stack developer with experience in Angular
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