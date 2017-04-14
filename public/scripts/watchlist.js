
function displayWatchList(finalHtml)
{
    var stockList = document.getElementById("stocklist");
    stockList.innerHTML += "<div style='padding-top:15px'>";    
    stockList.innerHTML += finalHtml;
    stockList.innerHTML += "</div>";    
}

function inputTicker () {
    //event.preventDefault();
    var ticker = $(this).attr('id');
    $.ajax({
        method: "POST",
        url: "/stock/stocklist",
        data: {"type": 'input',
                "ticker": ticker},
        success: function(result) {}
    });
}



function init() {

    function removeTicker() {
        var ticker = $(this).attr('id');
        $.ajax({
            method: "POST",
            url: "/stock/stocklist",
            data: {"type": 'remove',
                    "ticker": ticker},
            success: function(result) {}
        });
    }

    $(getElementByName("removebtn")).on('click', removeTicker);
}
$(document).on('ready', init);