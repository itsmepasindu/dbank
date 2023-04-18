import {dbank} from"../../declarations/dbank";

window.addEventListener("load", async function() {
    //console.log("Finished loading");
    update();
})

document.querySelector("form").addEventListener("submit", async function(event){
    event.preventDefault();
    //console.log("Submited");

    const buttton = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

    buttton.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length !=0){
        await dbank.topUp(inputAmount);
    }

    if(document.getElementById("withdrawal-amount").value.length !=0){
        await dbank.withdrowl(outputAmount);
    }

    await dbank.compound();

    update();

    document.getElementById("input-amount").value = "";
    buttton.removeAttribute("disabled");

    if(document.getElementById("withdrawal-amount").value.length !=0){
        await dbank.withdrowl(outputAmount);
    }

    document.getElementById("withdrawal-amount").value ="";
});

async function update(){
    const currentAmount = await dbank.checkBalance();
    const currentAmount1 = currentAmount.toFixed(2);
    document.getElementById("value").innerText = currentAmount1;
}