import styles from './index.module.scss';
import EntryButton from '../components/entry-button/entry-button';

function Home(props: any) {
  return (
    <div className={ styles.container }>
      <EntryButton target='./landing'></EntryButton>
    </div>
  )
}

export default Home
