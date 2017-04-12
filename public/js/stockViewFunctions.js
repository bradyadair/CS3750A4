//var yahooFinance = require('yahoo-finance');



document.onload = function() {
    alert("onload");
    // queryData(symbol, fromDate, toDate);
    // weeklyGraph();
    makeChart();

    var symbol = 'AMD';
var fromDate = '2017-04-04';
var toDate = '2017-04-11';

    
var seriesArray = [];

// query yahoo finance for data
// currently one symbol only
function queryData(symbol, fromDate, toDate) {
    alert("queryData");
    yahooFinance.historical({
      symbol: symbol,
      from: fromDate,
      to: toDate,
      period: 'd'  
    }, function (err, quotes) {
      if (err) { throw err; }
      if (quotes[0]) {
        console.log(
          '%s\n...\n%s',
          JSON.stringify(quotes[0], null, 2),
          JSON.stringify(quotes[quotes.length - 1], null, 2)          
        );
        return quotes;
      } else {
        console.log('Symbol not Found');    
      }
    });
}

    

// create/push series data into array to use in graph
function createSeriesObject(symbol, fromDate, toDate) {    

    //var quotes = queryData(symbol, fromDate, toDate);
    alert("createSeriesObject");
    var seriesObject = {};

    seriesObject.name = symbol;
    seriesObject.data = [];
    for (var quote in quotes) {
        seriesObject.data.push(quote.open);
    }

    console.log(seriesObject);

    return seriesObject;
}

// weekly graph data
function weeklyGraph() {

    // HardCoded variables
    var symbol = 'AMD';
    var fromDate = '2017-04-04';
    var toDate = '2017-04-11';

    seriesArray.push(createSeriesObject(symbol, fromDate, toDate)); 
    
}

function makeChart(){
    Highcharts.chart('container', {

        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },

        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },

        yAxis: {
            title: {
                text: 'Number of Employees'
            }
        },
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

        //series: seriesArray
        
        
        series: [{
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
}
}
