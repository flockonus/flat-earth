function earthChart() {

  var me = {
    width:  800,
    height: 400
  };

  function chart(selection) {
    selection.each(function(data) {

      var div = d3.select(this),
          svg = div.selectAll('svg').data([data]);

      svg.enter().append('svg');
      svg.attr('width', width).attr('height', height);
      svg.exit().remove();

      // Compute the projection
      var projection = d3.geo.orthographic()
        .clipAngle(90)
        .scale(me.width / (2 * Math.PI))
        .translate([me.width / 2, me.height / 2]);

      // Configure the path generator
      var pathGenerator = d3.geo.path()
        .projection(projection);

      var gmap = svg.selectAll('g.map').data([data.countries]);
      gmap.enter().append('g').classed('map', true);
      gmap.exit().remove();

      // Compute the path generator
      var countries = gmap.selectAll('path.country')
        .data(function(d) { return d; });

      countries.enter().append('path').classed('country', true);
      countries.attr('d', pathGenerator);
      countries.exit().remove();

      var gdots = svg.selectAll('g.meteorites').data([data.meteorites]);

      gdots.enter().append('g').classed('meteorites', true);
      gdots.exit().remove();

      var circles = gdots.selectAll('path.landing')
        .data(function(d) { return d; });

      circles.enter().append('path').classed('landing', true);
      circles.attr('d', pathGenerator);
      circles.exit().remove();

    });
  }

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
      coordinates: [+d.lat, +d.lon],
      mass: +d.mass
    });
  });

  chartData.meteorites = points;

  updateCharts();
});

