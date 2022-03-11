import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as S from '../styles/Home'

export default function Home() {

  const list = [];

  return (
    <div className={styles.container}>
      <Head>
        <title>EBP</title>
        <meta color=''/>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <S.Body>
        <S.List>
          {list.map(i => {
            return(
              <div>
                <img src={i.img}/>
                <b>{i.title}</b>
                <span>{i.user}</span>
              </div>
            )
          })}
        </S.List>
      </S.Body>
    </div>
  )
}
