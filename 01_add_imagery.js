//How to visualise data

// Specify the image you want and use Image() function to load it
var image = ee.Image('LANDSAT/LC08/C01/T1/LC08_044034_20140318');

// Define visualisation parameters in an object: bands, min&max pixel values and gamma stretch
var vizParams = {bands: ['B5', 'B4', 'B3'], min: 5000, max: 15000, gamma: 1.3};

// Center the map on the image and display. Parameters are the image and zoom level
Map.centerObject(image, 9);

// Add the layer to the map window, giving the image, parameters and a layer name
Map.addLayer(image, vizParams, 'Landsat 8 false color');

//Specify feature data using the FeatureCollection() function. ft: is fusion table
var counties = ee.FeatureCollection('ft:1S4EB6319wWW2sWQDPhDvmSBIVrD3iEmCLYB7nMM');

// Add the feature to the map, specify the feature, parameters (empty in this case) and layer name
Map.addLayer(counties, {}, 'counties');