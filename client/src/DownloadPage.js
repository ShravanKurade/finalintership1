import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function DownloadPage() {

  const [downloads, setDownloads] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [email,setEmail]=useState("");

  // 🎬 videos
  const videos = [
    {name:"Big Buck Bunny",url:"https://www.w3schools.com/html/mov_bbb.mp4"},
    {name:"Bear Video",url:"https://www.w3schools.com/html/movie.mp4"},
    {name:"Nature Clip",url:"https://samplelib.com/lib/preview/mp4/sample-5s.mp4"},
    {name:"Ocean Clip",url:"https://samplelib.com/lib/preview/mp4/sample-15s.mp4"}
  ];

  useEffect(()=>{
    const premiumStatus=localStorage.getItem("premium");
    const storedDownloads=JSON.parse(localStorage.getItem("downloads"))||[];
    const count=parseInt(localStorage.getItem("downloadCount"))||0;

    setIsPremium(premiumStatus==="true");
    setDownloads(storedDownloads);
    setDownloadCount(count);
  },[]);

  // 🔥 DOWNLOAD
  const handleDownload=(video)=>{

    if(!isPremium && downloadCount>=1){
      alert("Free user only 1 download. Buy premium.");
      return;
    }

    const link=document.createElement("a");
    link.href=video.url;
    link.download=video.name+".mp4";
    link.click();

    // email after download
    if(email){
      emailjs.send(
        "service_rgshpfo",
        "template_9qehn5l",
        {
          to_email: email,
          action: "Video Download",
          plan: isPremium ? "Premium" : "Free",
          amount: "0",
          video: video.name
        },
        "UCyArR1zjpcFC2CCe"
      );
    }

    const newDownloads=[...downloads,video.name];
    setDownloads(newDownloads);
    localStorage.setItem("downloads",JSON.stringify(newDownloads));

    if(!isPremium){
      const newCount=downloadCount+1;
      setDownloadCount(newCount);
      localStorage.setItem("downloadCount",newCount);
    }

    alert("Download started + email sent");
  };

  // 💰 BUY PREMIUM
  const buyPremium = () => {

    if(!email){
      alert("Enter email first");
      return;
    }

    const options = {
      key: "rzp_test_SKs8rO9rZ7O1Uj",
      amount: 5000,
      currency: "INR",
      name: "Internship Project",
      description: "Premium Upgrade",

      handler: function () {

        alert("✅ Premium Activated!");
        setIsPremium(true);
        localStorage.setItem("premium","true");

        // email after payment
        emailjs.send(
          "service_rgshpfo",
          "template_9qehn5l",
          {
            to_email: email,
            action: "Premium Purchase",
            plan: "Premium",
            amount: "₹50",
            video: "All Premium Access"
          },
          "UCyArR1zjpcFC2CCe"
        );
      },

      theme: { color: "#00e6e6" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return(
    <div style={{textAlign:"center",padding:"20px"}}>

      <h2>🎬 Video Download + Premium</h2>

      {/* EMAIL */}
      <input
        placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{padding:"10px",marginBottom:"10px"}}
      />
      <br/>

      {!isPremium && (
        <button
          onClick={buyPremium}
          style={{
            padding:"10px 20px",
            background:"gold",
            border:"none",
            borderRadius:"8px",
            marginBottom:"20px",
            fontWeight:"bold"
          }}>
          Buy Premium ₹50
        </button>
      )}

      {isPremium && <h3 style={{color:"lime"}}>👑 Premium Activated</h3>}

      {/* VIDEOS */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(2,1fr)",
        gap:"20px",
        marginTop:"20px"
      }}>

        {videos.map((video,i)=>(
          <div key={i} style={{
            padding:"15px",
            borderRadius:"15px",
            background:"#020617",
            color:"white",
            boxShadow:"0 0 15px cyan"
          }}>
            <h3>{video.name}</h3>

            <video width="100%" controls>
              <source src={video.url} type="video/mp4"/>
            </video>

            <button
              onClick={()=>handleDownload(video)}
              style={{
                marginTop:"10px",
                padding:"8px 15px",
                background:"cyan",
                border:"none",
                borderRadius:"8px"
              }}>
              Download
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}