angular.module('sampleApp')
    .directive('barChart', ['getService', function(getService) {
        return {
            restrict: 'A',
            scope: {
                barObj: '=barChart'
            },
            template: '<div class="pull-right"><button class="btn btn-warning" ng-click="fnInit();"><i class="fa fa-refresh"></i></button>&nbsp;&nbsp;<button class="btn btn-danger" ng-click="fnRemove();"><i class="fa fa-times-circle"></i></button></div>',
            link: function(scope, element, attr) {
                scope.fnInit = function() {
                    if ($(element[0]).children().length > 1)
                        $(element[0]).children()[1].remove();
                    getService.fnGetChartData(scope.barObj.chartUrl).then(function(response) {
                        scope.chartData = response.data.data;
                        drawChart();
                    });
                };

                function drawChart() {
                    var margin = {
                            top: 20,
                            right: 20,
                            bottom: 30,
                            left: 70
                        },
                        width = $(element).width() - margin.left - margin.right,
                        height = scope.barObj.height - margin.top - margin.bottom;

                    var color = d3.scale.category10();

                    var x = d3.scale.ordinal()
                        .rangeRoundBands([0, width], .1);

                    var y = d3.scale.linear()
                        .range([height, 0]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .ticks(9);

                    var svg = d3.select(element[0]).append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    x.domain(scope.chartData.map(function(d) {
                        return d[0];
                    }));
                    y.domain([0, d3.max(scope.chartData, function(d) {
                        return d[1];
                    })]);

                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end");

                    svg.selectAll(".bar")
                        .data(scope.chartData)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("fill", function(d, i) {
                            return color(i);
                        })
                        .attr("x", function(d) {
                            return x(d[0]);
                        })
                        .attr("width", 0)
                        .transition().delay(function(d, i) {
                            return i * 600;
                        })
                        .duration(1000)
                        .attr("width", x.rangeBand())
                        .attr("y", function(d) {
                            return y(d[1]);
                        })
                        .attr("height", function(d) {
                            return height - y(d[1]);
                        });


                    function type(d) {
                        d[1] = +d[1];
                        return d;
                    }
                }
                scope.fnInit();

                scope.fnRemove = function(){
                    $(element).parent().remove();
                };
            }
        }
    }]);
