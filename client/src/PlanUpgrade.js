import React, { useState, useEffect, useRef } from "react";

export default function PlanUpgrade() {

  const [plan, setPlan] = useState("Free");
  const videoRef = useRef(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem("plan");
    if (savedPlan) setPlan(savedPlan);
  }, []);

  const handleTimeUpdate = () => {

    const video = videoRef.current;
    if (!video) return;

    let limit = 0;

    if (plan === "Free") limit = 5 * 60;
    if (plan === "Bronze") limit = 7 * 60;
    if (plan === "Silver") limit = 10 * 60;
    if (plan === "Gold") limit = 999999;

    if (video.currentTime >= limit) {
      video.pause();
      alert(`${plan} plan limit finished.`);
    }
  };

  return (
    <div style={{ textAlign: "center", padding:"20px" }}>

      <h2>💎 Current Plan: {plan}</h2>

      {/* SINGLE VIDEO */}
      <video
        ref={videoRef}
        width="700"
        controls
        onTimeUpdate={handleTimeUpdate}
        style={{
          borderRadius:"15px",
          boxShadow:"0 0 20px cyan"
        }}
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
      </video>

      <p>
        Free: 5min | Bronze: 7min | Silver: 10min | Gold: Unlimited
      </p>

    </div>
  );
}