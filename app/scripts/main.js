
// Attach accessor methods to the target for every key-value
// pair in the attributes object
function createAccessorMethods(target, attributes) {

  // Returns an accessor method for the given attribute
  function createAccessor(attr) {
    return function(value) {
      if (!arguments.length) { return attributes[attr]; }
      attributes[attr] = value;
      return target;
    };
  }

  for (var attr in attributes) {
    // Avoid overwriting existing methods with the same name
    if ((!target[attr]) && (attributes.hasOwnProperty(attr))) {
      target[attr] = createAccessor(attr);
    }
  }
}


function earthChart() {

  var me = {
    width:  800,
    height: 400,
    maxDate: new Date()
  };

  function chart(selection) {
    selection.each(function(data) {

      var div = d3.select(this),
          svg = div.selectAll('svg').data([data]);

      svg.enter().append('svg');
      svg.attr('width', width).attr('height', height);
      svg.exit().remove();

      // Compute the projection
      var projection = d3.geo.mercator()
        .scale(me.width / (2 * Math.PI))
        .translate([me.width / 2, me.height / 2]);

      var rScale = d3.scale.sqrt()
        .domain(d3.extent(data.meteorites, function(d) { return d.mass; }))
        .range([1, 16]);

      var cScale = d3.scale.linear()
        .domain(rScale.domain())
        .range(['#E6781E', '#CC333F']);

      // Configure the path generator
      var pathGenerator = d3.geo.path()
        .projection(projection)
        .pointRadius(function(d) { return rScale(d.mass); });

      var gmap = svg.selectAll('g.map').data([data.countries]);
      gmap.enter().append('g').classed('map', true);
      gmap.exit().remove();

      // Compute the path generator
      var countries = gmap.selectAll('path.country')
        .data(function(d) { return d; });

      countries.enter().append('path').classed('country', true);
      countries.attr('d', pathGenerator);
      countries.exit().remove();

      // Filter the dates by maxDate
      var landings = data.meteorites.filter(function(d) { return d.date < me.maxDate; });

      var gdots = svg.selectAll('g.meteorites').data([landings]);

      gdots.enter().append('g').classed('meteorites', true);
      gdots.exit().remove();

      var circles = gdots.selectAll('circle.landing')
        .data(function(d) { return d; });

      circles.enter().append('circle')
        .classed('landing', true)
        .attr('r', 0)
        .attr('cx', function(d) { return projection(d.coordinates)[0]; })
        .attr('cy', function(d) { return projection(d.coordinates)[1]; })
        .attr('fill', '#EDC951')

      circles.transition()
        .delay(function(d, k) { return k; })
        .duration(0.5e3)
        .attr('r', function(d) { return rScale(d.mass); })
        .transition().duration(500)
        .attr('fill', '#CC333F');

      circles.exit().remove();

    });
  }

  createAccessorMethods(chart, me);
  return chart;
}


var chartData = {
  countries:  [],
  meteorites: []
};

var width  = 800,
    height = 400;

var mapChart = earthChart();

function updateCharts() {

  d3.selectAll('.chart-container')
    .data([chartData])
    .call(mapChart);
}

// Fetch the Map Data
d3.json('data/countries.topojson', function(error, topodata) {

  if (error) {
    console.error(error);
    throw error;
  }

  var geojson = topojson.feature(topodata, topodata.objects.countries);
  chartData.countries = geojson.features;

  updateCharts();
});


d3.csv('data/meteorite-landings.csv', function(error, mdata) {

  if (error) {
    console.log(error);
    throw error;
  }

  var points = [];

  mdata.forEach(function(d) {
    points.push({
      type: 'Point',
      coordinates: [+d.reclong, +d.reclat],
      mass: +d.mass,
      date: new Date(d.year)
    });
  });

  // Sort by date
  points.sort(function(a, b) { return a.date < b.date ? -1 : 1; });
  chartData.meteorites = points;

  updateCharts();
});
