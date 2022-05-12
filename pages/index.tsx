import type { GetStaticProps, NextPage } from 'next'
import { useSelector } from 'react-redux';

import DefaultLayout from '../layouts/defaultLayout';
import { RootState } from '../store/store';
const Home: NextPage = () => {
  const user = useSelector((state: RootState) => state.login)
    // console.log(user)
  return (
    <DefaultLayout>
      
      <p className='centered'>{!user.isloggedin ? "Please Login To Populate This Page!":`Welcome ${user.username}! :)`} </p>
    </DefaultLayout>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  return {
    props:{}
  }
}

export default Home;
