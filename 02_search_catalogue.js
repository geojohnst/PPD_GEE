//This geometry variable is usually hidden at the top of the editor in an 'Import' section
var dovestone_geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-2.0039749145507812, 53.541939535988895],
          [-2.0087814331054688, 53.51663422436193],
          [-1.9535064697265625, 53.51459281453801],
          [-1.93084716796875, 53.536022712816525],
          [-1.9411468505859375, 53.54969136298834],
          [-1.9765090942382812, 53.54561163101497]]]);
		  
//How to search and filter through a catalogue
//This uses Sentinel-2, filtered by date and a location, then selects the least cloudy image

// Choose the image collection you want to look through
var l8 = ee.ImageCollection('COPERNICUS/S2');

// Set the spatial boundaries or AOI you want, in this case the 
// geometry was drawn in the map window
var spatialFiltered = l8.filterBounds(dovestone_geometry);

//print('spatialFiltered', spatialFiltered); // prints list of images to console when uncommented

// Set the temporal bounds for searching through images
var temporalFiltered = spatialFiltered.filterDate('2017-01-01', '2018-05-08'); //there are 250 images in this date range

//print('temporalFiltered', temporalFiltered); // prints list of images found when uncommented

// Sort the filtered images based on cloud cover
var sorted = temporalFiltered.sort('CLOUD_COVER');

// Get the first (least cloudy) image.
var scene = ee.Image(sorted.first());

//Set the centre of the map to the polygon and zoom of the map
Map.centerObject(dovestone_geometry, 10);

// Visual parameters of the image, bands to display and maximum pixel value
var visParams = {bands: ['B4', 'B3', 'B2'], max: 3000}; //natural colour image

//Add the image to map view
Map.addLayer(scene, visParams, 'Natural-colour Dovestone');