// const campground = require("../../models/campground");

document.addEventListener("DOMContentLoaded", function () {
  // Make sure the MapTiler SDK is available
  if (typeof maptilersdk === "undefined") {
    console.error("MapTiler SDK not loaded!");
    return;
  }

  //   const maptilerApiKey = "<%- process.env.MAPTILER_API_KEY %>";
  maptilersdk.config.apiKey = maptilerApiKey;

  const map = new maptilersdk.Map({
    container: "cluster-map",
    style: maptilersdk.MapStyle.BRIGHT,
    center: campground.geometry.coordinates, // Example: Delhi
    zoom: 10,
  });

  new maptilersdk.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
      new maptilersdk.Popup({ offset: 25 }).setHTML(
        `<h3>${campground.title}</h3><p>${campground.location}</p>`
      )
    )
    .addTo(map);
  //   console.log(campground.geometry.coordinates);
});
