import styles from './stripe.module.scss';

function Stripe (props: { children: any, backgroundColor: string}) {
    return (
        <div style={{ display: 'flex', backgroundColor: props.backgroundColor }}>
            <div className='margin-container'>
                { props.children }
            </div>
        </div>
    )
};

export default Stripe;