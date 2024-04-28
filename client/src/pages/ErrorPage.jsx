import { Link } from "react-router-dom";

export default function ErrorPage () {
    return (
        <section>
            <div className="hero min-h-screen" style={{backgroundImage: 'url(https://cdn.pixabay.com/photo/2023/06/01/16/49/castle-8033915_1280.jpg)'}}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Oops, this page doesn&apos;t exist!</h1>
                  <p className="mb-5">Click the button below to go back home.</p>
                  <Link to="/">
                    <button className="btn btn-info">Go Home</button>
                  </Link>
                </div>
              </div>
            </div>
        </section>
    );
}