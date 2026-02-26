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

  // 🔥 PAYMENT FUNCTION
  const upgradeToGold = () => {

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Test key
      amount: 10000, // ₹100
      currency: "INR",
      name: "Internship Project",
      description: "Gold Plan Upgrade",
      handler: function (response) {

        alert("✅ Payment Successful!");
        setPlan("Gold");
        localStorage.setItem("plan", "Gold");

      },
      theme: {
        color: "#00e6e6"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ textAlign: "center", padding:"20px" }}>

      <h2>💎 Current Plan: {plan}</h2>

      {/* VIDEO */}
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

      {/* 🔥 Upgrade Button */}
      {plan !== "Gold" && (
        <button
          onClick={upgradeToGold}
          style={{
            padding:"12px 25px",
            fontSize:"16px",
            background:"gold",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer",
            marginTop:"20px"
          }}
        >
          Upgrade to Gold ₹100
        </button>
      )}

    </div>
  );
}