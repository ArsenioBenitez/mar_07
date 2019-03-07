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
    bottom:10,
    left:10,
    right:10
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


}
