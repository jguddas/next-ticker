import Head from 'next/head'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Hello World</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    Hello World
  </div>
)

export default Home
