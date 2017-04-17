window.onload = () => {
   
    var inputForm = document.getElementById("stockInput-form");
    var myFlag = JSON.stringify(sflag);
    var myTicker = JSON.stringify(tick);    
    document.getElementById("hiddenStatus").value = myFlag;
    document.getElementById("hiddenTicker").value = myTicker;

    console.log('Initial Status: ', myFlag);
    console.log('Initial Ticker: ', myTicker);
    

    inputForm.addEventListener('submit', function(evt)
    {
        var theFlag = "input";
        myFlag = JSON.stringify(theFlag);
        var theTicker = document.getElementById("stockInput").value
        myTicker = JSON.stringify(theTicker);

        console.log('Status being passed: ', myFlag);
        console.log('Ticker being passed: ', myTicker);

        document.getElementById('hiddenStatus').value = myFlag;
        document.getElementById('hiddenTicker').value = myTicker;
    })

    document.getElementsByName("removebtn").onclick = function() {
        var theFlag = "remove";
        myFlag = JSON.stringify(theFlag);
        var theTicker = $(this).attr("id");
        myTicker = JSON.stringify(theTicker);

        console.log('Status being passed: ', myFlag);
        console.log('Ticker being passed: ', myTicker);

        document.getElementById("hiddenStatus").value = myFlag;
        document.getElementById("hiddenTicker").value = myTicker;
        document.getElementById("stockRemove-form").submit();
        return false; // cancel the actual link
        inputForm.submit();
    }

    
}


function displayWatchList(finalHtml)
{
    var stockList = document.getElementById("stocklist");
    stockList.innerHTML += "<div style='padding-top:15px'>";    
    stockList.innerHTML += finalHtml;
    stockList.innerHTML += "</div>";    
}


// function inputTicker (event) {
//     event.preventDefault();
//     var ticker = $(this).attr('id');
//     $.ajax({
//         method: "POST",
//         url: "/stock/stocklist",
//         data: {status: 'input',
//                 ticker: ticker},
//         success: function(result) {}
//     });
// }



// function init() {

//     function removeTicker() {
//         var ticker = $(this).attr('id');
//         $.ajax({
//             method: "POST",
//             url: "/stock/stocklist",
//             success: function(result) {}
//         });
//     }

//     $(getElementByName("removebtn")).on('click', removeTicker);
// }

// $(document).on('ready', init);