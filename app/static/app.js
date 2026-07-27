async function searchPassenger(){

    const keyword=document.getElementById("searchBox").value.trim();

    if(keyword===""){

        alert("Enter search value");

        return;
    }

    document.getElementById("loading").style.display="block";

    document.getElementById("result").innerHTML="";

    const response=await fetch(`/search?q=${encodeURIComponent(keyword)}`);

    const data=await response.json();

    document.getElementById("loading").style.display="none";

    let html="";
    
    if(data.length===0){

        html="<div class='no-result'>No Passenger Found</div>";

    }else{

        data.forEach(p=>{
            const journeyDate = formatDate(p.Date);
            const returnDate = formatDate(p.DateR);
const message = `
🙏 *श्री पौड रोड जैन श्वेतांबर मूर्ति पूजक संघ*

    🌸 *पूर्णिमा पाबल यात्रा वर्ग, पुणे*
Pune - Surat - Navsari - Alipur - Pune

--------------------------------

Dear *${p.Name}*,

Your Journey Details:

🛄 *Pune to Surat*
📅 Date: ${journeyDate}
🚂 Train: ${p.TrainNo} ${p.TrainName}
🚃 Coach: ${p.Coach}
💺 Seat No: ${p.Seatno}

--------------------------------

🛄 *Surat to Pune*
📅 Date:  ${returnDate}
🚂 Train: ${p["TrainNoR"]} ${p["TrainNameR"]}
🚃 Coach: ${p["Return Coach"]}
💺 Seat No: ${p["Return Seatno"]}

--------------------------------

🙏 धन्यवाद

आपकी यात्रा मंगलमय हो।
प्रभु के आशीर्वाद से यात्रा सुखद एवं सफल हो।

श्री पौड रोड जैन श्वेतांबर मूर्ति पूजक संघ
`;

            const whatsappUrl =
            "https://wa.me/91" + p.Mobile + "?text=" + 
            encodeURIComponent(message);
            console.log(message);
console.log(encodeURIComponent(message));
            html += `

<div class="card">

    <h3>${p.Name}</h3>

    <div class="row">
        <span class="label">📱 Mobile</span>
        <span class="value">${p.Mobile}</span>
    </div>

    <div class="row">
        <span class="label">Age</span>
        <span class="value">${p.Age}</span>
    </div>

    <div class="row">
        <span class="label">Gender</span>
        <span class="value">${p.Sex}</span>
    </div>


    <div class="trip-title">
        🛕 Pune To Surat
    </div>
    
    <div class="row">
        <span class="label">📅 Date</span>
        <span class="value">${journeyDate}</span>
    </div>

    <div class="row">
        <span class="label">🚆 Train</span>
        <span class="value">${p.TrainNo}-${p.TrainName}</span>
    </div>

    <div class="row">
        <span class="label">🚪 Coach</span>
        <span class="value">${p.Coach}</span>
    </div>
    <div class="row">
        <span class="label">💺 Seat</span>
        <span class="value">${p.Seatno}</span>
    </div>
    <div class="row">
        <span class="label">🛏 Berth</span>
        <span class="value">${p.Berth}</span> 
    </div>



    <div class="trip-title">
        🔄 Surat To Pune
    </div>

    <div class="row">
        <span class="label">📅 Date</span>
        <span class="value">${returnDate}</span>
    </div>

    <div class="row">
        <span class="label">🚆 Train</span>
        <span class="value">${p.TrainNoR}-${p.TrainNameR}</span>
    </div>

    <div class="row">
        <span class="label">🚪 Coach</span>
        <span class="value">${p["Return Coach"]}</span>
    </div>

    <div class="row">
        <span class="label">💺 Seat</span>
        <span class="value">${p["Return Seatno"]}</span>
    </div>

    <div class="row">
        <span class="label">🛏 Berth</span>
        <span class="value">${p.BerthR}</span> 
    </div>

    

</div>
<div class="message-btn">

 <a class="message-btn" target="_blank" href="${whatsappUrl}">
            📱 Send WhatsApp Message
        </a>

</div>
`;

        });

    }

    document.getElementById("result").innerHTML=html;

}

function formatDate(dateValue) {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}