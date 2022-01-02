import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
    return (
        <div>
            <Head>
                <title>every penny</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="homepage">
                <div className="homepage__header">
                    <h1>
                        Think once,
                        <br />
                        think twice,
                        <br />
                        <span>think </span>
                        <span>budget</span>!
                    </h1>
                    <div className="homepage__image">
                        <Image
                            src="/pixeltrue-money-jar.png"
                            alt="money jar"
                            width={225}
                            height={350}
                        />
                    </div>
                </div>
                <div className="homepage__tagline">
                    <p>
                        Funny tagline with some text will go here to add some content underneath the
                        big text above.
                    </p>
                    <button className="button button--body">Get Started</button>
                </div>
                <div className="homepage__content ">
                    <div className="app-feature box-container">
                        <Image
                            src="/pixeltrue-receipt.png"
                            alt="receipt"
                            width={150}
                            height={120}
                        />
                        <div className="app-feature__text">
                            <h2>Log it</h2>
                            <p>Log your expenses one by one.</p>
                        </div>
                    </div>
                    <div className="app-feature box-container">
                        <Image
                            src="/pixeltrue-track.png"
                            alt="webpage search"
                            width={150}
                            height={120}
                        />
                        <div className="app-feature__text">
                            <h2>Track it</h2>
                            <p>Search, filter, edit and organise your recorded expenses.</p>
                        </div>
                    </div>
                    <div className="app-feature box-container">
                        <Image
                            src="/pixeltrue-magnify.png"
                            alt="magnifying glass"
                            width={150}
                            height={120}
                        />
                        <div className="app-feature__text">
                            <h2>Analyze it</h2>
                            <p>Analyze your spending habits and improve them.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
