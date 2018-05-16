//This geometry variable is usually hidden at the top of the editor in an 'Import' section
var dovestone_geometry = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[-1.9874954223632812, 53.537042913738745],
          [-2.0005416870117188, 53.52449273398847],
          [-1.9773674011230469, 53.52030851420592],
          [-1.9519615173339844, 53.523574282122595],
          [-1.9552230834960938, 53.53745098722465],
          [-1.9795989990234375, 53.538063090078964]]]);
		  
// Shows you how to loop through a collection using the map() function
// Uses the example of calculating NDVI for each image

//Put the ndvi calculation in a function
function addNDVI(input) {
  
  //Calculate the NDVI of the input image using an NDVI library function
  var ndvi = input.normalizedDifference(['B5', 'B4']);
  
  //Return image with the NDVI band added with the others
  return input.addBands(ndvi);
}



// Set the collection
var collection = ee.ImageCollection("COPERNICUS/S2");

//filter the collection by aoi and dates range
var filtered = collection.filterBounds(dovestone_geometry).filterDate('2018-05-04', '2018-05-09');

//Map.addLayer(filtered, {min:0, max:0.3, bands:['B4','B3','B2']}, 'RGB');

// loop through the collection and perform the function on each image
var with_ndvi = filtered.map(addNDVI);

// Center the map on the image and display. Parameters are the image and zoom level
Map.centerObject(dovestone_geometry, 14);

Map.addLayer(with_ndvi, {bands:['nd'], min:0, max:1}, 'NDVI');