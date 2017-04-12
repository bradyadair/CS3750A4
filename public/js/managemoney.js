window.onload = () => {
    $(function(){
        var dict = stockdict;
        var value = 0;

        document.getElementById('sliders').innerHTML = "";
    
        for(var i=0; i < dict.length; i++){
            //$("#sliders").innerHTML($('div', { id: 'slider' + i, 'class' : 'ansbox'}))

            console.log("<div id = \"slider" + i + "\" >  </div>");


            document.getElementById('sliders').innerHTML += "<div id = \"" + i + "\", value = \"" + dict[i]['name'] + "\">  </div> </br>";

        }

        for(var i=0; i < dict.length; i++){

            var myslider = "#" + i;

            $(myslider).slider({
                change:function( event, ui) 
                {   
                    id = i;
                    dict[parseInt($(this).attr('id'))]['y'] = $(this).slider( "option", "value" ); 
                    console.log(this + " " + value);
                    makeChart(dict);
                    console.log(dict[parseInt($(this).attr('id'))]['name']);
                    
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
}
