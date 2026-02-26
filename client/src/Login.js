import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function Login() {

  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [otp,setOtp]=useState("");
  const [realOtp,setRealOtp]=useState("");
  const [verified,setVerified]=useState(false);
  const [state,setState]=useState("");
  const [theme,setTheme]=useState("dark");

  const southStates = [
    "Tamil Nadu",
    "Kerala",
    "Karnataka",
    "Andhra Pradesh",
    "Telangana"
  ];

  // 🔥 THEME LOGIC
  useEffect(()=>{
    if(!state) return;

    const hour = new Date().getHours();

    if(hour >= 10 && hour < 12 && southStates.includes(state)){
      setTheme("light");
    }else{
      setTheme("dark");
    }

  },[state]);

  // 🔥 SEND OTP
  const sendOTP = () => {

    if(!state){
      alert("Select state first");
      return;
    }

    const generatedOtp = Math.floor(1000 + Math.random()*9000).toString();
    setRealOtp(generatedOtp);

    // SOUTH → EMAIL OTP
    if(southStates.includes(state)){

      if(!email){
        alert("Enter email");
        return;
      }

      emailjs.send(
        "service_rgshpfo",
        "template_gfm2d0l",
        {
          to_email: email,
          otp: generatedOtp
        },
        "UCyArR1zjpcFC2CCe"
      )
      .then(()=> alert("OTP sent to email"))
      .catch(()=> alert("Email failed"));

    }else{

      // OTHER STATES → PHONE OTP (SIMULATED)
      if(!phone){
        alert("Enter phone number");
        return;
      }

      alert("OTP sent to phone: " + generatedOtp);
    }
  };

  // 🔥 VERIFY
  const verify = ()=>{
    if(otp === realOtp){
      setVerified(true);
    }else{
      alert("Wrong OTP");
    }
  };

  return(
    <div style={{
      background: theme === "light" ? "#ffffff" : "#0f172a",
      color: theme === "light" ? "#000" : "#fff",
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>

      <div style={{padding:"30px",width:"350px"}}>
        <h2>🔐 Smart Login</h2>

        <select value={state} onChange={(e)=>setState(e.target.value)}>
          <option value="">Select State</option>
          <option>Maharashtra</option>
          <option>Tamil Nadu</option>
          <option>Kerala</option>
          <option>Karnataka</option>
          <option>Andhra Pradesh</option>
          <option>Telangana</option>
          <option>Gujarat</option>
          <option>Delhi</option>
        </select>

        <br/><br/>

        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Enter Phone"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
        />

        <br/><br/>

        <button onClick={sendOTP}>Send OTP</button>

        <br/><br/>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />

        <br/><br/>

        <button onClick={verify}>Verify</button>

        {verified && <h3 style={{color:"lime"}}>Login Successful ✅</h3>}

      </div>
    </div>
  );
}