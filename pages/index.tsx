import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GET_SELF from '../helpers/util/get_self-api-util';

import DefaultLayout from '../layouts/defaultLayout';
import { loginActions } from '../store/login-slice';
import { RootState } from '../store/store';

interface Props {
  data:{
    res?:{}
  }
}
const Home: NextPage = () => {
  const user = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(()=> {
    const sendReq = async () => {
      if(localStorage.getItem("TOKEN")) {
        dispatch(loginActions.login());
        const data = await GET_SELF();
        // if(data.)

        console.log(data, "DATA")
        if(data.status === 401) {
          localStorage.removeItem("TOKEN")
          router.replace("/auth-login");
          return;
        }
        // console.log(data.data.account, "DATA")
        dispatch(loginActions.setUser(data.data.account))
       
      }
    }
    sendReq()
   
  }, [])
    console.log(user)
  return (
    <DefaultLayout>
      
      <p className='centered'>{!user.isloggedin ? "Please Login To Populate This Page!":`Welcome ${user.username}! :)`} </p>
    </DefaultLayout>
  )
}


export default Home;
