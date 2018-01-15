/* Google Maps */

function initialize() {
  var featureOpts = [
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#efefef"
        },
        {
          "saturation": -100
        },
        {
          "lightness": 100
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#cccccc"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#efefef"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#efefef"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#272727"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#bbbbbb"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#bbbbbb"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#bbbbbb"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#272727"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#dddddd"
        }
      ]
    }
  ];
  var styledMap = new google.maps.StyledMapType(featureOpts,{name: "Styled Map"});

  var locationLat = 55.707529;
  var locationLng = 37.7667005;
  var zoomZ = 16;

  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (width < 992) {
    locationLat = 55.7037779;
    locationLng = 37.7638496;
    zoomZ = 15;
  }

  var mapOptions = {
    zoom: zoomZ,
    center: new google.maps.LatLng(locationLat, locationLng),
    disableDefaultUI: true,
    scrollwheel: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.LEFT_TOP
    },
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(document.getElementById('gmap-front'), mapOptions);

  var Marker = new google.maps.Marker({
    position: new google.maps.LatLng(55.709185, 37.762364),
    map: map,
    icon: {
      url: '/sites/moypsiholog.ru/themes/material_sketch/img/placemark.svg',
      size: new google.maps.Size(48,48),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(24,48)
    }
  });

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

}

google.maps.event.addDomListener(window, 'load', initialize);
;
