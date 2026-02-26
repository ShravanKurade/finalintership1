import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function PlanUpgrade() {

  const [plan, setPlan] = useState("Free");
  const [email, setEmail] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem("plan");
    if (savedPlan) setPlan(savedPlan);
  }, []);

  // 🎬 VIDEO TIME LIMIT
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

  // 💳 PAYMENT FUNCTION
  const payNow = (selectedPlan, price) => {

    if (!email) {
      alert("Enter email first");
      return;
    }

    const options = {
      key: "rzp_test_SKs8rO9rZ7O1Uj",
      amount: price * 100,
      currency: "INR",
      name: "Internship Project",
      description: selectedPlan + " Plan",
      handler: function () {

        // Save plan
        localStorage.setItem("plan", selectedPlan);
        localStorage.setItem("premium", "true");
        setPlan(selectedPlan);

        alert("Payment Successful 🎉");

        // Send Email
        emailjs.send(
          "service_rgshpfo",
          "template_gfm2d0l",
          {
            to_email: email,
            plan: selectedPlan,
            amount: price
          },
          "UCyArR1zjpcFC2CCe"
        );

      },
      theme: { color: "#00ffff" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>

      <h2>💎 Plan Upgrade</h2>
      <h3>Current Plan: {plan}</h3>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter email for invoice"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", marginBottom: "15px", borderRadius: "8px" }}
      />

      <br />

      {/* Video */}
      <video
        ref={videoRef}
        width="700"
        controls
        onTimeUpdate={handleTimeUpdate}
        style={{ borderRadius: "15px", boxShadow: "0 0 20px cyan" }}
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
      </video>

      <p>
        Free: 5min | Bronze: 7min | Silver: 10min | Gold: Unlimited
      </p>

      {/* 3 OPTIONS */}
      <div style={{ marginTop: "20px" }}>

        <button
          onClick={() => payNow("Bronze", 49)}
          style={{ margin: "10px", padding: "10px 20px", background: "#cd7f32", border: "none", borderRadius: "8px" }}>
          Bronze ₹49
        </button>

        <button
          onClick={() => payNow("Silver", 79)}
          style={{ margin: "10px", padding: "10px 20px", background: "#C0C0C0", border: "none", borderRadius: "8px" }}>
          Silver ₹79
        </button>

        <button
          onClick={() => payNow("Gold", 100)}
          style={{ margin: "10px", padding: "10px 20px", background: "gold", border: "none", borderRadius: "8px" }}>
          Gold ₹100
        </button>

      </div>

    </div>
  );
}