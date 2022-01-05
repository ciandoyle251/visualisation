function main() {
    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

    svg.append("text")
            .attr("transform", "translate(100,0)")
            .attr("x", 50)
            .attr("y", 50)
            .attr("font-size", "24px")
            .text("No. of Repos per Github User")

    var xScale = d3.scaleBand().range([0,width]).padding(0.2),
        yScale = d3.scaleLinear().range([height,0]);

    var g = svg.append("g").attr("transform", "translate("+100+","+100+")");

    d3.csv("data2.csv").then(function(data){

        xScale.domain(data.map(function(d){return d.User}));
        yScale.domain([0, d3.max(data, function(d){return d.RepoCount})]);

        g.append("g")
            .attr('transform', 'translate(0'+ ',' + height + ')')
            .call(d3.axisBottom(xScale))
        g.append('g')
            .call(d3.axisLeft(yScale).tickFormat(function(d) {
            return d;
        }).ticks(10));

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class","bar")
            .on("mouseover", onMouseover) // add listener for event
            .on("mouseout", onMouseout) // add listener for event
            .attr("x", function(d){return xScale(d.User);})
            .attr("y", function(d){return yScale(d.RepoCount);})
            .attr("width", xScale.bandwidth())
            .transition()
            .ease(d3.easeLinear)
            .duration(500)
            .delay(function(d,i){ return i * 50})
            .attr("height", function(d){return height - yScale(d.RepoCount);});
    });

    function onMouseover(d,i){
        var xPos = parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() / 2;
        var yPos = parseFloat(d3.select(this).attr('y')) / 2 + height / 2

        d3.select('#tooltip')
            .style('left', xPos + 'px')
            .style('top', yPos + 'px')
            .select('#value').text(i.User + ": " + i.RepoCount)
        
        d3.select('#tooltip').classed('hidden', false);

        d3.select(this).attr('calss','highlight')
        d3.select(this)
            .transition()
            .duration(500)
            .attr('width', xScale.bandwidth() + 5)
            //.attr('y', function(d){return yScale(d.value) -10;})
            //.attr('height', function(d){return height - yScale(d.value) + 10;})
    }

    function onMouseout(d,i){
        d3.select(this).attr('class','bar');
        d3.select(this)
            .transition()
            .duration(500)
            .attr('width', xScale.bandwidth())
        
        d3.select('#tooltip').classed('hidden', true);
    }
}






// const data = [
//     {name: 'Simon', score: 80},
//     {name: 'Mary', score: 90},
//     {name: 'John', score: 68}
// ];
// data.push({name: 'cian', score: 90})

// const namingO = 'data.json';

// d3.csv(namingO, function(Iam) {
//     console.log(Iam);
// });

    //g.append("g").attr('trnsform',)

    // for(var i = 0; i < Iam.length; i++){
    //     console.log(Iam[i].RepoCount + " " + Iam[i].User);
    // }
    // var one = Iam[0];
    // var two = Iam[1];
    // var three = Iam[2];
    // var four = Iam[3];
    // console.log(one, two, three, four);


    // var margin = {top: 30, right: 30, bottom: 70, left: 60},
    //     width = 460 - margin.left - margin.right,
    //     height = 400 - margin.top - margin.bottom;

    // var svg = d3.select("#my_dataviz")
    //     .append("svg")
    //         .attr("width", width + margin.left + margin.right)
    //         .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //         .attr("transform",
    //                 "translate(" + margin.left + "," + margin.top + ")");

    //     // X axis
    // var x = d3.scaleBand()
    //     .range([0,width])
    //     .domain(data.map(function(d) {return d.User}))
    //     .padding(0.2);
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x))
    //     .selectAll("text")
    //         .attr("transform", "translate(-10,0)rotate(-45)")
    //         .style("text-anchor", "end");
    // var y = d3.scaleLinear()
    //     .domain([0, 60])
    //     .range([ height, 0]);
    // svg.append("g")
    //     .call(d3.axisLeft(y));
    
    // svg.selectAll("mybar")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //         .attr("x", function(d) { return x(d.User); })
    //         .attr("y", function(d) { return y(d.RepoCount); })
    //         .attr("width", x.bandwidth())
    //         .attr("height", function(d) {return height - y(d.repCount); })
    //         .attr("fill", "69b3a2")
//------------------------------------------------------------------------
// const width = 800;
// const height = 400
// const margin = {top: 50, bottom: 50, left: 50, right: 50}
// const svg = d3.select('#d3-container')
//     .append('svg')
//     .attr('height', height - margin.top - margin.bottom)
//     .attr('width', width - margin.left - margin.right)
//     .attr('viewBox', [0, 0, width, height]);

// const x = d3.scaleBand()
//     .domain(d3.range(data.length))
//     .range([margin.left, width - margin.right])
//     .padding(0.1);

// const y = d3.scaleLinear()
//     .domain([0,100])
//     .range([height -margin.bottom, margin.top]);

// svg
//     .append('g')
//     .attr('fill', 'royalblue')
//     .selectAll('rect')
//     .data(data.sort((a,b) => d3.descending(a.score, b.score)))
//     .join('rect')
//         .attr('x', (d, i) => x(i))
//         .attr('y', (d) => y(d.score))
//         .attr('height', d => y(0) - y(d.score))
//         .attr('width', x.bandwidth())
//         .attr('class', 'rectangle')


// function xAxis(g){
//     g.attr('transform', `translate(0, ${height - margin.bottom})`)
//     .call(d3.axisBottom(x).tickFormat(i => data[i].name))
//     .attr('font-size', '20px')
// }
// function yAxis(g) {
//     g.attr('transform', `translate (${margin.left}, 0)`)
//     .call(d3.axisLeft(y).ticks(null, data.format))
//     .attr('font-size', '20px')
// }
// svg.append('g').call(yAxis)
// svg.append('g').call(xAxis)
// svg.node();


// function handleFiles(files){
//     if(window.FileReader){
//         getAsText(files[0]);
//         fileUploaded = true;
//     }   else {
//         alert('FileReader not supported in browser');
//     }
// }


//----------------------------------------------------------------------

// function getAsText(fileToRead) {
//     let reader = new FileReader();
//     reader.readAsText(fileToRead);

//     reader.onload = loadHandler;
//     reader.onerror = errorHandler;
// }

// function loadHandler(event) {
//     let csv = event.target.result;
//     processData(csv);
// }

// function errorHandler(event){
//     if(event.target.error.name == "NotReadableError") {
//         alert('cannot read file')
//     }
// }

// function processData(csv){
//     let allTextLines = csv.split();
