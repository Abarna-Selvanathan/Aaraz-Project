"use client";

import { useEffect, useState } from "react";
import { Gift, Loader2, Package } from "lucide-react"; 
const GiftLoader = () => {
    const [currentIcon, setCurrentIcon] = useState<"gift" | "package" | "loading">("gift");

    useEffect(() => {
        const icons: ("gift" | "package" | "loading")[] = ["gift", "package", "loading"];
        let index = 0;

        const interval = setInterval(() => {
            setCurrentIcon(icons[index]);
            index = (index + 1) % icons.length;
        }, 800); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "100vh",
            backgroundColor: "white", 
            color: "#4C394F" 
        }}>
            {currentIcon === "gift" && <Gift size={50} strokeWidth={2} />}
            {currentIcon === "package" && <Package size={50} strokeWidth={2} />}
            {currentIcon === "loading" && <Loader2 size={50} strokeWidth={2} className="animate-spin" />}
            
            {/* <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
                Wrapping your perfect gift... 
            </p> */}
        </div>
    );
};

export default GiftLoader;
