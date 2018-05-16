//How to reduce a collection of images into a single image/mozaic
// using sentinel-2 as an example


// set the collection to use
var collection = ee.ImageCollection("COPERNICUS/S2");

//set the temporal filter
var filtered = collection.filterDate('2017-05-01', '2018-05-01');

//attach reduction function to filter results
var reduced = filtered.mean(); //using mean, which taxes a mean value for each pixel

//Add the reduced image, setting the bands to use an min-max pixel values
Map.addLayer(reduced, {min: 0, max: 6000, bands:['B4','B3','B2']}, 'RGB');



/*
// Reduction of Landsat 5 from 1984 to 2012
var collection = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR");
var filtered = collection.filterDate('1984-05-01', '2012-05-01');
var reduced = filtered.mean();

Map.addLayer(reduced, {min:1000, max:8000, bands:['B3','B2','B1']}, 'RGB');
*/