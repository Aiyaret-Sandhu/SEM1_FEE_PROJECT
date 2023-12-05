function ShowInfo() {
    const uname = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const modeOfPayment = document.getElementById('modeOfPayment').value;
    const itemsi = document.querySelector('.items').innerText;
    const part1i = document.querySelector('.part1').innerText;
    const part2i = document.querySelector('.part2').innerText;
    const part3i = document.querySelector('.part3').innerText;
    const part4i = document.querySelector('.part4').innerText;
    const part5i = document.querySelector('.part5').innerText;

    let myDiv = document.createElement('div');
    myDiv.innerHTML = `
    <div class="OrderDetails" style="font-size:2rem;"> Order Details </div>
    <hr>
    <hr>
    <div class="OrderId" style="font-size:1.4rem; text-align:left;"> Order Id : ${generateRandomId(16)} </div>
    <div class="OrderDate" style="font-size:1.4rem; text-align:left;"> Order Date : ${getCurrentDate()}</div>
    <div class="ShipmentId" style="font-size:1.4rem; text-align:left;"> Shipment Id : ${generateRandomId(32)}</div>
    <hr> 

    <div class="NameOfBuyer" style="font-size:1.2rem; text-align:left;">Name : ${uname}</div>
    <div class="Phone" style="font-size:1.2rem; text-align:left;">Phone Number : ${phone} </div>
    <div class="Address" style="font-size:1.2rem; text-align:left;">Address : ${address} </div>
    <hr>
    <div class="Payment Method" font-size:1.4rem;>Payment Details : <br>
    <pre style="text-align:left; font-size:1rem;">
    ${itemsi}                   :  ${part1i}
    Shipping &amp; handling          :  ${part2i}
    Total before tax             :  ${part3i}
    Estimated tax (10%)          :  ${part4i}
    Net Total                    :  ${part5i}
    </pre>
    <br>
    </div>
    <hr>
    <div class="Total Amount" style="font-size:1.2rem;">Total Amount ( +GST )  :  ${part5i}</div>
    <div class="ModeOfPayment" style="font-size:1.2rem;"> Mode of PayMent : ${modeOfPayment}</div>
    <hr>
    <p class="Seller" style="font-size:1.2rem; text-align:left">Sold by ; 
    <br> R N Ventures <br>
    #60, 4th floor, 3rd Cross , Ludhiana - 140104
    </p>
    <hr>
    <p style="font-size:1rem; text-align:left;">*Invoice only valid after successful payment ! </p>
    <p class="Footer" style="font-size:1rem; text-align: left;"> This invoice is issued in accordance with the provisions of the Information Technology Act (21 of 2000), hence physical signature is not required.</p>
    `;

    return myDiv;
}

function generateRandomId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; 
    var day = date.getDate();
    var formattedDate = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');
    return formattedDate;
}

document.getElementById('getPdf').addEventListener('click', function () {
    printNow();
});

function printNow() {
    const element = ShowInfo();
    const options = {
        margin: 1,
        filename: 'Invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
}