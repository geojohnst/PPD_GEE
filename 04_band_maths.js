//This demonstrates how to do basic band maths, using NDVI as an example

// Select the image you want
var image = ee.Image('COPERNICUS/S2/20180507T110621_20180507T110835_T30UWE')

// select the specific bands you want using select() function
var red = image.select('B4');
var nir = image.select('B5');

// use functions rather than operators like + * /
var ndvi = nir.subtract(red).divide(nir.add(red));

//Add the layer to the map
//NDVI values ar 0-1, we can stretch the min and max to highlight low areas
Map.addLayer(ndvi, {min:0, max:0.4}, 'NDVI'); 

