window.onload = () => {

    var instaData = [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175];

    function makeChart(){
        Highcharts.chart('container', {
            title: {
                text: 'My stock performance'
            },
            /*subtitle: {
                text: 'Source: thesolarfoundation.com'
            },
            yAxis: {
                title: {
                    text: 'Growth index
                }
            },*/
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    pointStart: 2010
                }
            },
            series: [{
                name: 'Installation',
                data: instaData
            }, {
                name: 'Manufacturing',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
                name: 'Sales & Distribution',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                name: 'Project Development',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }]
        });
    };

    makeChart();

        

    $(document).ready(function(){
        $("button").click(function(){ 
            let inputData = $("#formData").serializeArray();

            $.post("/stock/queryData",
            {              
                //symbols:
                dateFrom: inputData[0].value,
                dateTo: inputData[1].value,
                period: inputData[2].value
            },
            function(data, status) {
                instaData = data.instaData;
                //alert(instaData);
                makeChart();
            });
        });
    });
};