//This geometry variable is usually hidden at the top of the editor in an 'Import' section
var dovestone_geometry = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[-1.9874954223632812, 53.537042913738745],
          [-2.0005416870117188, 53.52449273398847],
          [-1.9773674011230469, 53.52030851420592],
          [-1.9519615173339844, 53.523574282122595],
          [-1.9552230834960938, 53.53745098722465],
          [-1.9795989990234375, 53.538063090078964]]]);

//This finds the NDVI difference between two images, using a DEM as a mask to exclude anything 
// that isn't land from the analysis.

// This function gets NDVI from Sentinel-2 imagery.
var getNDVI = function(image) {
  return image.normalizedDifference(['B4', 'B3']);
};

// Load two Sentinel-2 images, around a month apart
var image1 = ee.Image('COPERNICUS/S2/20180405T112109_20180405T112110_T30UWE');
var image2 = ee.Image('COPERNICUS/S2/20180507T110621_20180507T110835_T30UWE');

// Compute NDVI from the scenes.
var ndvi1 = getNDVI(image1);
var ndvi2 = getNDVI(image2);

// Get the difference between the NDVI images by subtracting one from the other
var ndviDifference = ndvi2.subtract(ndvi1);

// Load the land mask from the SRTM DEM.
var landMask = ee.Image('CGIAR/SRTM90_V4').mask();

// Apply the mask to the NDVI difference image
var maskedDifference = ndviDifference.updateMask(landMask);

// Display the masked result, setting the colour palette for each end of the scale 
var vizParams = {min: -0.25, max: 0.25, palette: ['FF0000', 'FFFFFF', '0000FF']};

// centre map on dovestone reservoir
Map.centerObject(dovestone_geometry, 14);

// add the masked NDVI difference layer
Map.addLayer(maskedDifference, vizParams, 'NDVI difference');