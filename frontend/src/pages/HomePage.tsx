import React from "react";
import PageBase from "../components/pageBase/pageBase";

function HomePage() {
    console.log("on the home page");
    return (
        <PageBase>
            <div>
                <h1>
                    Welcome to Roland's <br />
                    Development Technical Test <br />
                    (Extended Version)
                </h1>
            </div>
        </PageBase>
    );
}

export default HomePage;
