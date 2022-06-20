import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { parseCookies } from "../../helpers/coockie";
import GET_USERS from "../../helpers/util/getAllUsers-api-util";
import DefaultLayout from "../../layouts/defaultLayout";
import { RootState } from "../../store/store";
import styles from "./allUsers.module.css";
interface Props {
    data: {
        data: {}
    }
}
interface Tbody {
    user: [{
        username: string;
        userId: number;
        mobile: string;
        userType: string;
        university: string
    }]
}
const TableBody: React.FC<Tbody> = props => {
    console.log(props.user, "ALL USERS")
    const handle = () => { }
    return <tbody>
        {props.user?.map(user => {
            return <tr key={user?.username}>
                <td>{user?.userId}</td>
                <td>{user?.mobile}</td>
                <td>{user?.username}</td>
                <td>{user?.userType}</td>
                <td>{user?.university}</td>
                <td onClick={handle}><a href={`#${user?.userId}`}>View</a></td>

            </tr>
        })}

    </tbody>
}
const All_Users: NextPage<Props> = (props) => {
    console.log(props.data.data, "PROPS")


    const route = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("TOKEN")) {
            route.replace("/auth-login");
            console.log("FIRING")
        }
    }, [])
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
                {/* <TableBody /> */}
                {/* <TableBody onShowDetails={showDeatils} user={users} start={(page - 1) * 10} end={page * 10} /> */}
            </table>
        </DefaultLayout>
    )
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const users = await GET_USERS();

    const data = parseCookies(context.req)
    console.log(context.req.cookies)
    console.log(data)

    return {
        props: {
            data: users
        }
    }
}
export default All_Users;