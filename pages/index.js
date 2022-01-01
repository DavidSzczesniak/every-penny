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
                <div className="homepage__content">
                    <h1>
                        Think once,
                        <br />
                        think twice,
                        <br />
                        <span>think budget</span>!
                    </h1>
                    <p>
                        Funny tagline with some text will go here to add some content underneath the
                        big text above.
                    </p>
                    <button className="button">Get Started</button>
                </div>
                <div className="homepage__image">
                    <Image
                        src="/hand-thumbs-up.png"
                        alt="Hand doing peace sign"
                        width={550}
                        height={500}
                    />
                </div>
            </div>
        </div>
    );
}
