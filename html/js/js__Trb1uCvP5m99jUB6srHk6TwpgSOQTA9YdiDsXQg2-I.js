function initialize(){var e=[{featureType:"landscape.man_made",elementType:"geometry.fill",stylers:[{color:"#efefef"},{saturation:-100},{lightness:100}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{color:"#cccccc"},{visibility:"on"}]},{featureType:"landscape.natural",elementType:"geometry.fill",stylers:[{color:"#efefef"}]},{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#efefef"}]},{featureType:"poi.park",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#272727"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#bbbbbb"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#bbbbbb"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"#bbbbbb"}]},{featureType:"transit",elementType:"labels.text.fill",stylers:[{color:"#272727"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#dddddd"}]}],o=new google.maps.StyledMapType(e,{name:"Styled Map"}),t=55.707529,l=37.7667005,a=16;(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)<992&&(t=55.7037779,l=37.7638496,a=15);var r={zoom:a,center:new google.maps.LatLng(t,l),disableDefaultUI:!0,scrollwheel:!1,zoomControl:!0,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL,position:google.maps.ControlPosition.LEFT_TOP},mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP,"map_style"]}},s=new google.maps.Map(document.getElementById("gmap-front"),r);new google.maps.Marker({position:new google.maps.LatLng(55.709185,37.762364),map:s,icon:{url:"/sites/moypsiholog.ru/themes/material_sketch/img/placemark.svg",size:new google.maps.Size(48,48),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(24,48)}});s.mapTypes.set("map_style",o),s.setMapTypeId("map_style")}google.maps.event.addDomListener(window,"load",initialize);
//# sourceMappingURL=maps/js__Trb1uCvP5m99jUB6srHk6TwpgSOQTA9YdiDsXQg2-I.js.map
