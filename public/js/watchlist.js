window.onload = () => {
   
    var inputForm = document.getElementById("stockInput-form");
    var removeForm = document.getElementById("stockRemove-form");
    var myFlag = JSON.stringify(sflag);
    var myTicker = JSON.stringify(tick);    
    document.getElementById("hiddenInStatus").value = myFlag;
    document.getElementById("hiddenInTicker").value = myTicker;
    document.getElementById("hiddenRemStatus").value = myFlag;
    document.getElementById("hiddenRemTicker").value = myTicker;

    console.log('Initial Status: ', myFlag);
    console.log('Initial Ticker: ', myTicker);
    

    inputForm.addEventListener('submit', function(evt)
    {
        var theFlag = "input";
        myFlag = JSON.stringify(theFlag);
        var theTicker = document.getElementById("mySearch").value
        myTicker = JSON.stringify(theTicker);

        console.log('Status being passed: ', myFlag);
        document.getElementById('hiddenInStatus').value = myFlag;
        console.log(document.getElementById('hiddenInStatus').value);
        
        console.log('Ticker being passed: ', myTicker);        
        document.getElementById('hiddenInTicker').value = myTicker;
        console.log(document.getElementById('hiddenInTicker').value);
    })

    document.getElementById("removebtn").onclick = function() {
        var theFlag = "remove";
        myFlag = JSON.stringify(theFlag);
        var theTicker = $(this).attr("data-id");
        myTicker = JSON.stringify(theTicker);

        console.log('Status being passed: ', myFlag);
        console.log('Ticker being passed: ', myTicker);

        document.getElementById("hiddenRemStatus").value = myFlag;
        document.getElementById("hiddenRemTicker").value = myTicker;
        removeForm.submit();
        return false; // cancel the actual link
    }

    
}


function displayWatchList(finalHtml)
{
    var stockList = document.getElementById("stocklist");
    stockList.innerHTML += "<div style='padding-top:15px'>";    
    stockList.innerHTML += finalHtml;
    stockList.innerHTML += "</div>";    
}
