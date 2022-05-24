import style from './button.module.scss';

function Button(props: { children?: any, style?: any }) {
    return (
        <div className={ style.container } style={ props.style }>
            { props.children }
        </div>
    )
}

export default Button;