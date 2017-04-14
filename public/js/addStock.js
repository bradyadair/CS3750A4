function init() {

    function checkInput() {

        var stock = document.getElementById("mySearch");
        var submitOk = true;

        if (stock.value === "") {
            submitOk = false;
            question.style = "background-color:#99ff99";
            question.placeholder = "Required";
        }
        if (stock.value === "Search stocks here...") {
            submitOk = false;
            answer.style = "background-color:#99ff99";
            answer.placeholder = "Required";
        }

        if (submitOk) {
            addStock();
        }

    }
    function modalDisplay(){
        var modal = document.getElementById('myModal');
        //var span = document.getElementsByClassName("close")[0];
        var delayMillis = 2000; //2 second
        
        //open the modal 
        modal.style.display = "block";
        setTimeout(function(){window.location = '../stock/addStock'}, delayMillis);    

        // // When the user clicks on <span> (x), close the modal
        // span.onclick = function() {
        //     modal.style.display = "none";
        // }

        // // When the user clicks anywhere outside of the modal, close it
        // window.onclick = function(event) {
        //     if (event.target == modal) {
        //         modal.style.display = "none";
        //     }
        // }
    }

    function addStock(event) {

        //var categoryInput = $('#category').val();
        //var questionInput = $('#question').val();
        //var answerInput = $('#answer').val();
        var stockInput = document.getElementById("mySearch").value;

        var patchData = {
                stock: stockInput,
            };

        console.log(patchData);

        $.ajax({
            url: '../stock/addStock',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(patchData),
            success: function(data, textStatus, jqXHR) {
                //modalDisplay();
                console.log("created");
                window.location = '../stock/addStock';
            },
            /*error: function(err) { //On Error will need to popup banner that there was an error.
                if(err.responseJSON.message == "You are already following this stock"){
                    document.getElementById("question").value = "";
                    document.getElementById("question").style = "background-color:#99ff99";
                    document.getElementById("question").placeholder = "Stock has been added already";
                }
            }*/
        });
    }

    $('#addStockFinal').on('click', checkInput);
}
$(document).on('ready', init);