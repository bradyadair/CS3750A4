window.onload = () => {
    $(function () {
        var dict = stockDict;
        var value = 0;
    });

    var instaData = [{ y: 43934, indexChange: '+1.5' }, { y: 52503, indexChange: '-1.2' }, 57177, 69658, 97031, 119931, 137133, 154175];


    function makeChartContainers() {
        var stockList = document.getElementById("stockCharts");
        // stockCharts.innerHTML += "<div style='padding-top:15px'>";    
        //stockCharts.innerHTML += '<br/><div id="container" style="width:100%; height:400px;"></div>'
        stockCharts.innerHTML += finalHtml;
        // stockCharts.innerHTML += "</div>";

        // ******** HOW TO QUERY YAHOO FINANCE HISTORICAL DATA EXAMPLE *****************
        for (var key in histDict) {
            var symbol = "";
            var highs = [];
            var lows = [];
            var opens = [];
            var closes = [];
            var volumes = [];
            var adjCloses = [];
            var dates = [];
            console.log("\nkey: " + key + "\n");
            var x = 0;
            for (var i = 0; i < histDict[key].length; i++) {
                console.log(" values:");
                symbol = histDict[key][i].symbol;
                opens.push(histDict[key][i].open);
                highs.push(histDict[key][i].high);
                lows.push(histDict[key][i].low);
                closes.push(histDict[key][i].close);
                volumes.push(histDict[key][i].volume);
                adjCloses.push(histDict[key][i].adjClose);
                var date = histDict[key][i].date + "";
                date = date.substring(5, 7) + "/" + date.substring(8, 10) + "/" + date.substring(2, 4);
                dates.push(date);
                // console.log("The symbol: " + symbol);
                // for(var val in histDict[key][i]){
                //     console.log("   "+val+": " + histDict[key][i][val]);
                // }
            }
            console.log("\nOpens: " + opens);
            console.log("Highs: " + highs);
            console.log("Lows: " + lows);
            console.log("Closes: " + closes);
            console.log("Volumes: " + volumes);
            console.log("adjCloses: " + adjCloses);
            console.log("dates: " + dates);
            makeChart(symbol, opens, highs, lows, closes, volumes, adjCloses, dates);
        }
        // ******** HOW TO QUERY YAHOO FINANCE HISTORICAL DATA EXAMPLE *****************    
    }

    makeChartContainers();


    function makeChart(symbol, opens, highs, lows, closes, volumes, adjCloses, dates) {
        var chart = Highcharts.chart(symbol, {
            title: {
                text: symbol
            },
            /*subtitle: {
                text: 'Source: thesolarfoundation.com'
            },
            */
            series: [{
                showInLegend:false,
                name: 'Dates',
                data: dates
            }, {
                name: 'Open',
                data: opens
            }, {
                name: 'High',
                data: highs
            }, {
                name: 'Low',
                data: lows
            }, {
                name: 'Close',
                data: closes
            }],
            yAxis: {
                title: {
                    text: 'Growth index'
                }
            },
            xAxis: {
                type: 'category',
                categories: dates,
                labels: {
                    enabled: true,
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            tooltip: {
                shared: false,
                crosshairs: true,
                formatter: function () {
                    var value = this.x;
                    value += "<br> " + this.y;

                    if (this.point.indexChange) {
                        value += " <br>Index Change:(" + this.point.indexChange + ")";
                    }

                    return value;
                }
            }
        });
        chart.series[0].hide();
    };

    //makeChart();


    $(document).ready(function () {
        $("button").click(function () {
            let inputData = $("#formData").serializeArray();

            $.post("/stock/queryData",
                {
                    //symbols:
                    dateFrom: inputData[0].value,
                    dateTo: inputData[1].value,
                    period: inputData[2].value
                },
                function (data, status) {
                    instaData = data.instaData;
                    //alert(instaData);
                    makeChart();
                });
        });
    });
};