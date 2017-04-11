
function displayWatchList(finalHtml)
{
    var stockList = document.getElementById("stocklist");
    stockList.innerHTML += "<div style='padding-top:15px'>";    
    stockList.innerHTML += finalHtml;
    stockList.innerHTML += "</div>";    
}


// Need a function to remove the row from the list and post back to db removing the ticker