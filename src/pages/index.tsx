import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState } from "react";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Canvas from "@/components/Canvas";

import styles from "@/styles/Home.module.css";

export default function Home() {
    return (
        <>
            <Head>
                <title>Sa Talaia</title>
                <meta name="description" content="Sa Talaia" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                {false && <Header />}
                <Banner />
                <Canvas />
            </main>
        </>
    );
}
