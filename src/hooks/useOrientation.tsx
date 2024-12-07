import { useEffect, useState } from "react";

const useOrientation = () => {
    const [orientation, setOrientation] = useState<string | undefined>(undefined);

    useEffect(() => {
        const handleOrientationChange = () => {
            console.log("orientation changed: ", window.screen.orientation.type);
            setOrientation(window.screen.orientation.type);
        };

        window && handleOrientationChange();

        window.onload = handleOrientationChange;
        window.screen.orientation.addEventListener("change", handleOrientationChange);
        return () => window.screen.orientation.removeEventListener("change", handleOrientationChange);
    }, []);

    return orientation;
};

export default useOrientation;