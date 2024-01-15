var cenej = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: "http://localhost:8080/geoserver/cite/wms?service=WMS",
        params: { LAYERS: "cite:Cenej" },
        serverType: "geoserver",
    }),
    title: "Opština Čenej",
    visible: false,
});

var serbiaBorder = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: "http://localhost:8080/geoserver/cite/wms?service=WMS",
        params: { LAYERS: "cite:drzava" },
        serverType: "geoserver",
    }),
    title: "Granice republike Srbije",
    visible: false,
});

var serbiaRails = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: "http://localhost:8080/geoserver/cite/wms?service=WMS",
        params: { LAYERS: "Srbija pruga" },
        serverType: "geoserver",
    }),
    title: "Pruge u Srbiji",
    visible: false,
});

var natureReservates = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: "http://localhost:8080/geoserver/cite/wms?service=WMS",
        params: { LAYERS: "eco_rezervat_prirode_p" },
        serverType: "geoserver",
    }),
    title: "Zaštićena područja u Srbiji",
    visible: false,
});

var hipodromes = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: "http://localhost:8080/geoserver/ne/wms?service=WMS",
        params: { LAYERS: "ne:Hipodromi" },
        serverType: "geoserver",
    }),
    title: "Hipodromi u Srbiji",
    visible: false,
});

var googleRoadmap = new ol.layer.Tile({
    title: "Google Roadmap",
    source: new ol.source.XYZ({
        url: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
    }),
    type: "base",
    visible: false,
});

var googleSatelite = new ol.layer.Tile({
    title: "Google Satellite",
    source: new ol.source.XYZ({
        url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
    }),
    type: "base",
    visible: false,
});

var yandex = new ol.layer.Tile({
    title: "Yandex Map",
    source: new ol.source.XYZ({
        url: "https://sat0{1-4}.maps.yandex.net/tiles?l=sat&x={x}&y={y}&z={z}",
        projection: "EPSG:3395",
        tileGrid: ol.tilegrid.createXYZ({
            extent: yandexMap,
        }),
    }),
    visible: false,
    type: "base",
    zIndex: 0,
});

var openStreet = new ol.layer.Tile({
    title: "OpenStreetMap",
    source: new ol.source.OSM(),
    visible: true,
    type: "base",
});

var baseLayers = new ol.layer.Group({
    title: "Base Layers",
    layers: [googleRoadmap, googleSatelite, yandex, openStreet],
});

var overlays = new ol.layer.Group({
    title: "Overlays",
    layers: [cenej, serbiaBorder, serbiaRails, natureReservates, hipodromes],
});

var yandexMap = [
    -20037508.342789244, -20037508.342789244, 20037508.342789244,
    20037508.342789244];

var viewSetup = new ol.View({
    projection: "EPSG:3857",
    center: ol.proj.fromLonLat([20.91667, 44.01667]),
    zoom: 7,
    extent: yandexMap,
});

var map = new ol.Map({
    target: "map",
    layers: new ol.layer.Group({
        title: 'Layers',
        type: 'base',
        layers: [baseLayers, overlays],
    }),
    view: viewSetup,
});

var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: "Legend",
    groupSelectStyle: "children",
});

map.addControl(
    layerSwitcher
);