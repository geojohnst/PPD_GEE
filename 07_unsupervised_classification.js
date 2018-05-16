//This geometry variable is usually hidden at the top of the editor in an 'Import' section
var sample_region = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-2.0980453491210938, 53.55846145508274],
          [-2.1200180053710938, 53.555096402115346],
          [-2.1239662170410156, 53.52571730549891],
          [-2.0012283325195312, 53.50448638751872],
          [-1.9330787658691406, 53.50652828420372],
          [-1.9301605224609375, 53.55611614339911],
          [-2.022857666015625, 53.56029682571355]]]);
		  
//Runs an unsupervised classification on a Sentinel-2 image over the North peak district

// Set your image
var input = ee.Image('COPERNICUS/S2/20180507T110621_20180507T110835_T30UWE');


// Centre the map to the sample region
Map.centerObject(sample_region, 12);

//Map.addLayer(ee.Image().paint(sample_region, 0, 2), {}, 'region'); //adds a polygon of the region to the map

// Create the training data set
var training = input.sample({
  region: sample_region, //sample region geometry
  scale: 15, // spatial scale of the image/output classification
  numPixels: 5000 //number of random pixels to select from the sample region
});

// train the classifier using the training data
var clusterer = ee.Clusterer.wekaKMeans(10).train(training);

// run the classifier on the image
var result = input.cluster(clusterer);

// Add the classified image to the map, using random colours
Map.addLayer(result.randomVisualizer(), {}, 'clusters');