import { useEffect, useState } from "react";


const useOrientation = () => {
    const [orientation, setOrientation] = useState(() => window.screen.orientation.type);

    useEffect(() => {
        const handleOrientationChange = () => {
            console.log("changed");
            setOrientation(window.screen.orientation.type);
        };

        window.screen.orientation.addEventListener("change", handleOrientationChange);
        return () => window.screen.orientation.removeEventListener("change", handleOrientationChange);
    }, []);

    return orientation;
};

export default useOrientation;