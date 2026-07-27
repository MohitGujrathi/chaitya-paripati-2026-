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
        🛕 Going Journey
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
        <span class="value">${p.Seatno}</span>
    </div>

    <div class="row">
        <span class="label">🛏 Birth</span>
        <span class="value">${p.Birth}</span>
    </div>


    <div class="trip-title">
        🔄 Return Journey
    </div>

    <div class="row">
        <span class="label">🚆 Train</span>
        <span class="value">${p["Return Train"]}</span>
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
        <span class="label">🛏 Birth</span>
        <span class="value">${p["Return Birth"]}</span>
    </div>

</div>

`;

        });

    }

    document.getElementById("result").innerHTML=html;

}