import style from './card.module.scss';

function Card(props: { children?: any, style?: any }) {
    return (
        <div className={ style.container } style={ props.style }>
            { props.children }
        </div>
    )
}

export default Card;