var visualSearch = null;

$(document).ready(function () {
    visualSearch = VS.init({
        container: $('#inputBox'),
        query: '',
        callbacks: {
            search: function (query, searchCollection) {},
            facetMatches: function (callback) {
                callback([ "one" , "two" , "three"  ]);
            },
            valueMatches: function (facet, searchTerm, callback) {}
        }
    });
    search();
});


var search = function () {
        var data = {
                area: true,
                key: "Trend",
                seriesIndex: 1,
                values: genrateTrendData()
        };
        loadGraph([data],"chart");
}


var genrateTrendData = function () {
    var trend = [];
    //for (var bucketIndex in histogram) {
    for (var i = 0 ; i < 1000 ; i++) {
        trend.push({
            series: 0,
            x: (i),
            y: (i)
        });
    }
    return trend;
};


function loadGraph(data,chartID) {
    console.log(data);
    nv.addGraph(function () {
        var chart = nv.models.multiBarChart()
            .transitionDuration(350)
     //   .showYAxis(false)

            //.reduceXTicks(false) //If 'false', every single x-axis tick label will be rendered.
        //    .rotateLabels(20) //Angle to rotate x-axis labels.
            .showControls(false) //Allow user to switch between 'Grouped' and 'Stacked' mode.
            .groupSpacing(0.1) //Distance between each group of bars.
        ;

        chart.xAxis
            .tickFormat(function (d) {
                return d3.time.format('%b-%a-%I-%p')(new Date(d))
            });

        chart.yAxis
            .tickFormat(d3.format(',.1f'));

        d3.select('#' + chartID + ' svg')
            .datum(data)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

