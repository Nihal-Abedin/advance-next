import { GetStaticProps, NextPage } from "next";
import React from "react";
import GET_USERS from "../../helpers/util/getAllUsers-api-util";
import DefaultLayout from "../../layouts/defaultLayout";
import styles from "./allUsers.module.css";
interface Props {
    data:{
        data:{}
    }
}
interface Tbody {
    user:[{
        username:string;
    }]
}
const TableBody:React.FC<Tbody> = props => {
    console.log(props.user, "ALL USERS")
    return <tbody>
        {props.user?.map(user => {
            return <tr key={user?.username}>
                <td>{user?.userId}</td>
                <td>{user?.mobile}</td>
                <td>{user?.username}</td>
                <td>{user?.userType}</td>
                <td>{user?.university}</td>
                <td onClick={handle}><a href={`#${user?.userId}`}>{View}</a></td>

            </tr>
        })}

    </tbody>
}
const All_Users:NextPage<Props> = (props) => {
    console.log(props.data.data, "PROPS")
    return (
        <DefaultLayout>
            <table className={styles.contentTable}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Number</th>
                    <th>Name</th>
                    <th>User Type</th>
                    <th>University</th>
                    <th></th>
                </tr>
            </thead>
            <TableBody user={users}/>
            {/* <TableBody onShowDetails={showDeatils} user={users} start={(page - 1) * 10} end={page * 10} /> */}
        </table>
        </DefaultLayout>
    )
} ;

export const getStaticProps:GetStaticProps = async () => {
    const users = await GET_USERS();
    
    return {
        props:{
            data : users
        }
    }
}
export default All_Users;