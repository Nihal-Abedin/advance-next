import React from "react";

import classes from "./main.module.css";

import Paths from "../helpers/paths";

import Link from 'next/link';
interface Children {
    children: JSX.Element[] | JSX.Element;
  }
const DefaultLayout = ({ children }: Children) => {
    const paths=Paths();
    console.log(paths)
    return(
    <div>
        <div className={classes.container}>
            <p>Advance Next Project</p>
            <nav className={classes.links}>
                {paths.map(links=>links.show && <Link key={links.name} href={links.path}>{links.name}</Link>)}
            </nav>
        </div>
        {children}
    </div>
    );
};
export default DefaultLayout;