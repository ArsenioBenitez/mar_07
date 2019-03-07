var gradeP = d3.json("gradeData.json");
gradeP.then(function(data)
{
    drawChart(data);
},
function(err)
{
  console.log(err);
})

var drawChart = function(data)
{
  var screen =
  {
    width:500,
    height:400
  };
  var svg = d3.select("svg")
              .attr("width",screen.width)
              .attr("height",screen.height)

  var margins =
  {
    top:10,
    bottom:40,
    left:10,
    right:100
  };

  var width = screen.width-margins.left-margins.right;
  var height = screen.height-margins.top-margins.bottom;

  var xscale = d3.scaleLinear()
                .domain([0,20])
                .range([0,width]);
  var yscale = d3.scaleLinear()
                .domain([0,100])
                .range([height,0]);

  var colors = d3.scaleOrdinal(d3.schemeSet1);
  var plot = svg.append('g')
                .classed("plot",true)
                .attr("transform","translate("+margins.left+","+margins.top+")")
  var student = plot.selectAll('g')
                    .data(data)
                    .enter()
                    .append('g')
                    .attr("fill",function(d)
                    {
                      return colors(d.name);
                    })
  student.selectAll("circle")
        .data(function(d)
        {
            return d.grades
        })
        .enter()
        .append('circle')
        .attr('cx',function(d,i)
        {
            return xscale(i)
        })
        .attr('cy',function(d)
        {
            return yscale(d)
        })
        .attr('r',10)

  var legend = svg.append('g')
                  .classed('legend',true)

                  .attr('transform','translate('+(width+margins.left)+','+margins.top+')');

  console.log('data:',data)
  var legendLines = legend.selectAll('g')
                          .data(data)
                          .enter()
                          .append('g')
                          .classed('legendLines',true)
                          .attr('transform',function(d,i)
                          {
                              return "translate(0,"+(i*12)+")";
                          })
  legendLines.append('rect')
            .attr('x',0)
            .attr('y',0)
            .attr('width',10)
            .attr('height',10)
            .attr('fill',function(d)
            {
                return colors(d.name);
            })
  legendLines.append('text')
            .attr('x',20)
            .attr('y',0)
            .text(function(d)
            {
                return d.name;
            })
  var xAxis = d3.axisBottom(xscale);
  svg.append('g').classed('xAxis',true)
                .call(xAxis)
                .attr('transform','translate('+margins.left+','+margins.top+height+')')

}
