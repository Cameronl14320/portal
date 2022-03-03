import styles from './entry.module.scss';
import EntryButton from '../components/entry-button/entry-button';

function Entry(props: any) {
    return (
        <div
            className={ styles.container }>
            <EntryButton></EntryButton>
        </div>
    )
}

export default Entry;