import style from './entry-button.module.scss';
import Link from "next/link";

function EntryButton(props: { target: string }) {
    return (
        <Link href={ props.target } passHref>
            <a>
                <div className={ style.container }>
                    ENTER
                </div>
            </a>
        </Link>
    )
};

export default EntryButton;