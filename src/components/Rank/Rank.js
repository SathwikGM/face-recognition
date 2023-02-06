import React from "react";

const Rank = ({ name, entries }) => {
    return (
        <div >
            <div className="white f3">
                {`${name} Current rank is`}
            </div>
            <div className="white f3">
                {entries}
            </div>
        </div>
    );
}

export default Rank;