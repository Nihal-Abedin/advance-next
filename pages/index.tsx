import type { NextPage } from 'next'

import DefaultLayout from '../layouts/defaultLayout';
const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <p className='centered'>Please Login To Populate This Page! </p>
    </DefaultLayout>
  )
}

export default Home;
