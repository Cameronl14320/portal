import styles from './entry-button.module.scss';
import Link from "next/link";

function EntryButton(props: any) {
    return (
        <div
            className={ styles.container }>
            <Link
                href=''>
                ENTER
            </Link>
        </div>
    )
};

export default EntryButton;