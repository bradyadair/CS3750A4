window.onload = () => {
        $(function(){
            var dict = stockDict;
            var value = 0;
        });

        var thinkTank = { SP500:[0,100],SP500:[1,102],SP500:[2,103],SP500:[4,105],SP500:[6,102],SP500:[7,113],
            SP500:[8,256],SP500:[9,56],SP500:[10,24],SP500:[11,113],SP500:[12,115],SP500:[13,112],SP500:[14,130],
            SP500:[15,145],SP500:[16,150],SP500:[17,145],SP500:[18,170],SP500:[19,190],SP500:[20,175],
            SP500:[21,180],SP500:[22,150],SP500:[23,145],SP500:[24,179] }

        function makeChart(){
                Highcharts.chart('container', {
                    title: {
                        text: 'My stock performance'
                    },
                    /*subtitle: {
                        text: 'Source: thesolarfoundation.com'
                    },
                    */
                    yAxis: {
                        title: {
                            text: 'Growth index'
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
                       formatter: function() {
                            var value = this.x;
                            value += "<br> " + this.y;
                
                            if(this.point.indexChange) {
                                value += " <br>Index Change:("+this.point.indexChange+")";
                            }
                
                            return value;
                            }
                    },
                    series: [{
                        name: 'Installation',
                        data: [{y:43934, indexChange:'+1.5'}, {y:52503, indexChange:'-1.2'}, 57177, 69658, 97031, 119931, 137133, 154175]
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
};