import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GET_SELF from "../../helpers/util/get_self-api-util";
import DefaultLayout from "../../layouts/defaultLayout";
import { loginActions } from "../../store/login-slice";

import styles from "./userProfile.module.css";
import { RootState } from "../../store/store";
import Image from "next/image";
import FILE_UPLOAD from "../../helpers/util/fileUpload-api-util";
interface data {
    email?:string;
    mobile?:string;
    maritalStatus?:string;
    university?:string;
    weight?:string;
    height?:string;
    profilePicture?:string
}
const Profile :NextPage = () => {
    const [info, setInfo] = useState<data>({});
    const [image, setImage] = useState<any>();
    const dispatch = useDispatch();
    const router = useRouter();

    // const data = useSelector((state:RootState) => state.login)
    // const info:data = data.data || {} ;
    // console.log(data.data, "PROFILE");


    useEffect(()=> {
        const sendReq = async () => {
            dispatch(loginActions.login());
            const data = await GET_SELF();
    
            console.log(data.data.account, "DATA");
            if(data.status === 401) {
                localStorage.removeItem("TOKEN")
                router.replace("/auth-login");
                return;
            }
            setInfo(data.data.account);
           
          
        }

        if(localStorage.getItem("TOKEN")) {

            sendReq();
        }
       
      }, []);

    const handelProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log( e.target.files, "IMAGE");
        const files = e.target.files;
        const formData = new FormData();
        formData.append('file', files![0]);
        const res = await FILE_UPLOAD(formData);
        console.log(res)
        setInfo({...info, profilePicture:res.data.fileName})
        // console.log(Object.fromEntries(formData))
    }

    const handelDetailFrom = () => {

    }

    return (
        <DefaultLayout>
            <div className="centered">
                <div className={styles.profileContainer}>
                    <p >Back</p>
                    <div className={styles.profileContent}>
                        <div className={styles.profileImageContainer}>
                        <img src={info ? `https://exam.greeho.com/api/files/${info?.profilePicture}` :""} className={styles.profileImage} alt="profile" />
                            {/* <Image className={styles.profileImage} alt="profile" src={info ? `https://exam.greeho.com/api/files/${info?.profilePicture}` :""}  width={200} height={200}/> */}
                            <input type="file" onChange={handelProfileImage}  className={styles.fileInput} />
                        </div>
                    </div>
                    <form onSubmit={handelDetailFrom} className={styles.profileForm}>
                        <p>Email</p>
                        <input type="email" name="email" defaultValue={info.email} required />
                        <p>Mobile</p>
                        <input type="text" name="mobile" defaultValue={info.mobile} required />
                        <p>Marital Status</p>
                        <input type="text" name="maritalStatus" defaultValue={info.maritalStatus}  required />
                        <p>Address</p>
                        <input type="text" name="address" defaultValue={info.email}  required />
                        <p>University</p>
                        <input type="text" name="university" defaultValue={info.university}  required />
                        <p>Weight</p>
                        <input type="number" name="weight" defaultValue={info.weight}  required />
                        <p>Height</p>
                        <input type="number" name="height" defaultValue={info.height} required />
                        <div className={styles.button}>
                            <button  type="submit" >Submit</button>
                        </div>
                        {/* disabled={!formValidation} */}
                    </form>

                </div>
            </div>
        </DefaultLayout>
    )
} ;



export default Profile;