angular.module('sampleApp')
    .directive('pieChart', ['getService', function(getService) {
        return {
            restrict: 'A',
            scope: {
                chartObj: '=pieChart'
            },
            template:'<div class="pull-right"><button class="btn btn-warning" ng-click="fnInit();"><i class="fa fa-refresh"></i></button>&nbsp;&nbsp;<button class="btn btn-danger" ng-click="fnRemove();"><i class="fa fa-times-circle"></i></button></div>',
            link: function(scope, element, attr) {
                scope.fnInit = function(){
                    if($(element[0]).children().length > 1)
                        $(element[0]).children()[1].remove();
                    getService.fnGetChartData(scope.chartObj.chartUrl).then(function(response) {
                        scope.chartData = response.data.data;
                        drawChart();
                    });
                };

                function drawChart() {
                    var radius = $(element).width()/4,
                        width = $(element).width(),
                        font = radius/10,
                        height = scope.chartObj.height;

                    function tweenPie(finish) {
                        var start = {
                            startAngle: 0,
                            endAngle: 0
                        };
                        var i = d3.interpolate(start, finish);
                        return function(d) {
                            return arc(i(d));
                        };
                    }

                    var color = d3.scale.category10();

                    var canvas = d3.select(element[0]).append("svg")
                        .attr("width", width)
                        .attr("height", height);

                    var group = canvas.append("g")
                        .attr({
                            'transform': 'translate(' + radius * 1.5 + ', ' + radius + ')'
                        });

                    var arc = d3.svg.arc()
                        .innerRadius(0)
                        .outerRadius(radius);

                    var pie = d3.layout.pie()
                        .value(function(d) {
                            return d[1];
                        });

                    var arcs = group.selectAll(".arc")
                        .data(pie(scope.chartData))
                        .enter()
                        .append("g")
                        .attr("class", "arc");

                    arcs.append("path")
                        .attr("d", arc)
                        .attr("fill", function(d, i) {
                            return color(i);
                        })
                        .attr("data-legend", function(d) {
                            return d.data[0];
                        })
                        .transition()
                        .duration(5000)
                        .attrTween('d', tweenPie);

                    var legend = canvas.append("g")
                        .attr("class", "legend")
                        .attr({
                            'transform': 'translate(' + radius*2.7 + ', ' + radius*1.5 + ')'
                        })
                        .style({"font-size":font})
                        .call(d3.legend);
                }

                scope.fnInit();

                scope.fnRemove = function(){
                    $(element).parent().remove();
                }
            }
        }
    }]);