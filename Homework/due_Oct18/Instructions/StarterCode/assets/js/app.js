// @TODO: YOUR CODE HERE!

var svgSize = {
    width: 700,
    height: 600, 
}

var svg = d3.select("#scatter").append("svg")
                                .attr("width", svgSize.width)
                                .attr("height", svgSize.height)
                                .attr("style", "border: 1px solid black")


  var margin ={
    top: 50,
    bottom: 20,
    left: 50,
    right:20
}
{}
var chartSize = {
    width : svgSize.width - margin.left - margin.right,
    height : svgSize.height - margin.top - margin.bottom
}

var frame = svg.append("g")
                .attr("transform", 'translate(' + margin.top + ")")

d3.csv(".\\assets\\data\\data.csv").then(data => {
    //console.log(data)
    //smokes,log

    data.forEach(state => {
        state.smokes = +state.smokes;
        state.age = +state.age;
    })
    var xvals = data.map(state => state.age)
    var yvals = data.map(state => state.smokes)
    console.log(xvals)
    console.log(yvals)

    var xScale = d3.scaleLinear()
        .domain([.9 * d3.min(xvals), d3.max(xvals) * 1.1])
        .range([chartSize.height, 0])

    var yScale = d3.scaleLinear()
        .domain([.9 * d3.min(yvals), d3.max(yvals) * 1.1])
        .range([chartSize.height, 0])

    var bottomAxis = d3.axisBottom(xScale)
    var leftAxis = d3.axisLeft(yScale)

    frame.append("g").attr("id", "xAxis").attr("transform", `translate(0, ${chartSize.height})`).call(bottomAxis)
    frame.append("g").attr("id", "yAxis").call(leftAxis)

    var chartData = frame.append("g").attr("id", "chartData")

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([30,80])
        .html(function(d){
            return (`${d.state}`);
        })
        svg.call(toolTip);
        radius = 10

    chartData.selectAll("circle").data(data).enter().append("circle")
            .attr("r", radius) 
            .attr("cx", d => xScale(d.age))
            .attr("cy", d => yScale(d.smokes))
            .attr('stroke', "black")
            .attr("fill", "blue")
            .attr("opacity", "5")
            .on("mouseover", function(data){
                toolTip.show(data, this);
            })
            .on('mouseout', toolTip.hide);

    chartData.selectAll("text").data(data).enter().append("text")
            .attr("dx", d => xScale(d.age) - (radius/1.5))
            .attr("dy", d => yScale(d.smokes) + (radius/2))
            .style('fill', "white")
            .style('font-size', 10)
            .text(d => d.abbr)
    console.log(data)
    
})



