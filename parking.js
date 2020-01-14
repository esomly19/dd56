function sendXhr(urlSend) {
  return new Promise((resolve, reject) => {
    let xhr = $.ajax({
      url: urlSend,
      method: "GET",
      dataType: "json"
    })
      .done(data => {
        resolve(data);
      })
      .fail(error => {
        reject("Non, marche pas");
      });
  });
}

function showWeatherData(doto, ok) {
  // afficher les données météo renvoyées par l'API
  // params : weatherData=  objet json contenant les données
  // return : vide
  let data;
  if (ok) {
    data = `  <h3>baba </h3>`;
    doto.forEach(repo => {
      console.log(repo);
      contenu += ` <p>${repo.fields}</p>  `;
      var map = new Microsoft.Maps.Map(document.getElementById("myMap"), {});
      var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), {
        text: "A",
        title: "Title",
        subTitle: "Subtitle"
      });
      map.entities.push(pushpin);
    });
  } else {
    data = ` <div id="data"> <h2> Marche pas </h2>
                        </div> `;
  }

  $("#promise").html(data);
}

$(document).ready(() => {
  let url =
    "https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=nom%2Cadresse%2Cplaces%2Ccapacite&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson";

  sendXhr(url)
    .then(function(dataFromResolve) {
      // traitement de l'événement qui est réussi
      showWeatherData(dataFromResolve, true);
    })
    .catch(function(dataFromReject) {
      // traitement de l'événement qui a échoué
      showWeatherData(dataFromReject, false);
    });
});
