window.onload = () => {
    var form = document.getElementById("myForm");
    
    var dict = stockdict;

    $(function(){
        var value = 0;

        document.getElementById('sliders').innerHTML = "";
    
        for(var i=0; i < dict.length; i++){
            //$("#sliders").innerHTML($('div', { id: 'slider' + i, 'class' : 'ansbox'}))

            console.log("<div id = \"slider" + i + "\" >  </div>");


            document.getElementById('sliders').innerHTML += "<div id = \"" + i + "\", value = \"" + dict[i]['name'] + "\">  </div> </br>";

        }

        for(var i=0; i < dict.length-1; i++){

            var myslider = "#" + i;

            $(myslider).slider({
                value: dict[i]['y'],
                change:function( event, ui) 
                {   
                    var myTotal = 0;
                    var value = $(this).slider( "option", "value" );
                    for(var i=0; i < dict.length-1; i++)
                    {
                        var myslider = "#" + i;

                        
                        if (dict[parseInt($(this).attr('id'))]['name'] != dict[i]['name'])
                        {
                            myTotal += dict[i]['y'];
                        }
                        else
                        {
                            myTotal += value;
                        }
                    }

                    console.log("myTotal is: " + myTotal);

                    if (myTotal <= 100)
                    {
                        dict[dict.length-1]['y'] = 100 - myTotal;

                        console.log(dict[dict.length-1]['name'] +" : " +dict[dict.length-1]['y']);
                        
                        dict[parseInt($(this).attr('id'))]['y'] = $(this).slider( "option", "value" ); 
                        console.log("Your value was: " + value);
                        makeChart(dict);
                        console.log(dict[parseInt($(this).attr('id'))]['name']);

                        
                        dict[parseInt($(this).attr('id'))]['y'] = $(this).slider( "option", "value" );
                    } 
                    else
                    {
                        console.log("You went over 100, chart will not be changed.");
                        console.log("You're total was: " + myTotal);
                    }
                    
                }
            });
        }
        

        //defining a function
        function makeChart(mydict){
            Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser market shares January, 2015 to May, 2015'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: mydict
                }]
            });


        }

        makeChart(dict);
    });
    

    form.addEventListener('submit', function(evt)
    {
        var myDict = JSON.stringify(dict);

        console.log('dict being passed: ', myDict);

        document.getElementById('hiddenDict').value = myDict;
    })
}
