window.onload = () => {
    $(function(){
        var dict = stockdict;
        

        $("#slider").slider();
        $("#slider2").slider({
            change:function( event, ui ) { value = $( "#slider2" ).slider( "option", "value" ); console.log("Hello " +value); makeChart(dict);}
        });
        

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
