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

            html+=`

            <div class="card">

                <h3>${p.Name}</h3>

                <div class="row">
                    <span class="label">📱 Mobile</span>
                    <span class="value">${p.Mobile}</span>
                </div>

                <div class="row">
                    <span class="label">🎫 PNR</span>
                    <span class="value">${p.PNR}</span>
                </div>

                <div class="row">
                    <span class="label">🚆 Train</span>
                    <span class="value">${p.Train}</span>
                </div>

                <div class="row">
                    <span class="label">🚪 Coach</span>
                    <span class="value">${p.Coach}</span>
                </div>

                <div class="row">
                    <span class="label">💺 Seat</span>
                    <span class="value">${p.Seat}</span>
                </div>

                <div class="row">
                    <span class="label">✅ Status</span>
                    <span class="value">${p.Status}</span>
                </div>

            </div>

            `;

        });

    }

    document.getElementById("result").innerHTML=html;

}