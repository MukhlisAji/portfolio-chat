import React from "react";
import Lottie from "lottie-react";

interface LottiePlayerProps {
    animationData: any;
    width?: number | string;
    height?: number | string;
    loop?: boolean;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ animationData, width = 200, height = 200, loop = true }) => {
    return (
        <div style={{ width, height }}>
            <Lottie animationData={animationData} loop={loop} style={{ width: "100%", height: "100%" }} />
        </div>
    );
};

export default LottiePlayer;
