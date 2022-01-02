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
                            src="/hand-thumbs-up.png"
                            alt="Hand showing thumbs up"
                            width={225}
                            height={200}
                        />
                    </div>
                </div>
                <div className="homepage__content">
                    <p>
                        Funny tagline with some text will go here to add some content underneath the
                        big text above.
                    </p>
                    <button className="button button--body">Get Started</button>
                </div>
            </div>
        </div>
    );
}
