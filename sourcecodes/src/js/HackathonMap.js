import platform from './HereAPI'
import { CircleGeoJson, mapTime, roundoff } from './parameters'
import { weaInformation, inputParameters } from './weatherResult'

const jburgLanduse = require('./JBurg_Landuse.json')
const jburgRivers = require('./JBurg_Rivers.json')
const jburgLakes = require('./JBurg_Lakes.json')

// Real map time
const mapRealTime = zone => `${mapTime(zone).D} ${mapTime(zone).H}:${mapTime(zone).M}  ${mapTime(zone).S}`

const mapContainer = document.getElementById('mapContainer')
const weatherDataDiv = document.querySelector('#weatherData')
const clearMap = document.querySelector('#clearMap')
const worldView = document.querySelector('#worldView')
const townSelection = document.getElementById('townSelection')
const mapButtons = document.getElementById('mapButtons')
const geomValueForm = document.getElementById('geomValueForm')



// Open weather
const mainDormain = 'https://api.openweathermap.org/data/2.5/onecall?'
const appId = 'd3491049ca278f52fb44f8b6b2e480ac'

// areaCoverageRadius in meters
const areaCoverageRadius = 2000

let selectionCOORDS
let selectionLNG
let selectionLAT
let tapPosition
let areaCoverage
let summaryDiv

// Obtain the default map types from the platform object:
const defaultLayers = platform.createDefaultLayers();


// retrieve maximum zoom level
const maxZoom = 13.25

// Instantiate (and display) a map object:
const hackathonMap = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
    zoom: maxZoom,
    center: { lng: 28.05, lat: -26.21 }, // Johanessburg
    pixelRatio: window.devicePixelRatio || 1
})

if (hackathonMap) mapButtons.style.display = 'inline-block'

const displayHEREData = (geoData, fillCol) => {

    const geoJsonReader = new H.data.geojson.Reader(undefined, {
        disableLegacyMode: true,

        // This function is called each time parser detects a new map object
        style: mapObject => {
            // Parsed geo objects could be styled using setStyle method
            if (mapObject instanceof H.map.Polygon) {
                mapObject.setStyle({
                    fillColor: fillCol,
                    strokeColor: 'rgb(0, 68, 102)',
                    lineWidth: 4
                });
            }
        }
    })

    // Start parsing the file
    geoJsonReader.parseData(geoData)

    // Add layer which shows GeoJSON data on the map
    hackathonMap.addLayer(geoJsonReader.getLayer())

}


// Map jburg data from HERE Tech
if (hackathonMap) displayHEREData(jburgLanduse, 'rgba(165, 42, 42, 0.4)')
if (hackathonMap) displayHEREData(jburgLakes, 'rgba(173, 216, 230, 0.4)')
if (hackathonMap) displayHEREData(jburgRivers, 'rgba(173, 255, 230, 0.4)')


const showCircularArea = (theMap, summarizedWeatherData) => {

    const circularAreaStyle = {
        fillColor: 'rgba(0, 68, 102, 0.5)',
        strokeColor: 'rgb(0, 68, 102)',
        lineWidth: 4
    }

    let circleLon
    let circleLat

    if (tapPosition) {
        circleLon = roundoff(tapPosition['lng'], 5)
        circleLat = roundoff(tapPosition['lat'], 5)

    } else {
        circleLon = roundoff(selectionLNG, 5)
        circleLat = roundoff(selectionLAT, 5)
    }

    areaCoverage = new H.map.Circle({
            lat: circleLat,
            lng: circleLon
        },
        areaCoverageRadius, {
            style: circularAreaStyle
        });

    // Add the circle to the map:
    theMap.addObject(areaCoverage)

    // zoom map to circle
    // get the shape's bounding box and adjust the camera position
    hackathonMap.getViewModel().setLookAtData({
        zoom: 14,
        bounds: areaCoverage.getBoundingBox()
    });

    areaCoverage.addEventListener('pointerenter', () => {

        if (summaryDiv) summaryDiv.remove()

        summaryDiv = document.createElement("DIV"); // Create a <button> element
        document.body.appendChild(summaryDiv); // Append <button> to <body>
        summaryDiv.className = "summaryDivStyle";

        summaryDiv.innerHTML = `${weaInformation(summarizedWeatherData).summaryResults}`


        // Real time and display
        const realTimeSummary = document.getElementById('realTimeSummary')
        setInterval(() => {
            if (realTimeSummary) realTimeSummary.innerHTML = mapRealTime(weaInformation(summarizedWeatherData).placeZoneNum)
        }, 1000);


        summaryDiv.addEventListener('click', () => {
            summaryDiv.remove()
        })

    })

    areaCoverage.addEventListener('longpress', () => {
        theMap.removeObject(areaCoverage)
        summaryDiv.remove()
    })

}

let geomValueInput

const spatialAnalytics = jsonData => {

    if (geomValueInput) geomValueInput.remove()

    const jsonInput = document.createElement("INPUT")
    jsonInput.setAttribute("type", "hidden");
    jsonInput.setAttribute("name", "geomValue");
    jsonInput.setAttribute("id", "geomValueInput");
    jsonInput.setAttribute("value", `${jsonData}`);
    geomValueForm.appendChild(jsonInput)


    const jsonButton = document.createElement("INPUT")
    jsonButton.setAttribute("type", "submit");
    jsonButton.setAttribute("id", "geomValue");
    jsonButton.setAttribute("value", 'Spatial Analytics');
    geomValueForm.appendChild(jsonButton)

    geomValueInput = document.getElementById('geomValueInput')
    let geomValueButton = document.getElementById('geomValue')

    geomValueForm.addEventListener('submit', () => {
        if (geomValueButton) geomValueButton.remove()
    })

    hackathonMap.addEventListener('tap', () => {
        if (geomValueButton) geomValueButton.remove()
    })

    if (townSelection) {
        townSelection.addEventListener('change', () => {
            if (geomValueButton) geomValueButton.remove()
        })
    }

}

let dataSource = () => {

    // Open weather API uses "lat" and "lon" 
    let lon
    let lat

    if (tapPosition) {
        lon = roundoff(tapPosition['lng'], 5)
        lat = roundoff(tapPosition['lat'], 5)

    } else {
        lon = roundoff(selectionLNG, 5)
        lat = roundoff(selectionLAT, 5)
    }

    // Indeed it generates a valid geojson => confirm via http://geojson.tools/
    let areaGeoJson = CircleGeoJson({ lng: lon, lat: lat, radius: areaCoverageRadius })
    spatialAnalytics(areaGeoJson)

    let subSourceOne = `${mainDormain}lat=${lat}&lon=${lon}`

    return `${subSourceOne}&units=${inputParameters().units}&lang=${inputParameters().lang}&exclude=${inputParameters().part}&appid=${appId}`
}

const getWeatherData = async() => {
    let site = dataSource()
    const weatherDataResponse = await fetch(site)
    if (weatherDataResponse.status !== 200) throw new Error()
    return await weatherDataResponse.json()
}


submitParameters.addEventListener('click', () => {

    getWeatherData()
        .then(data => {

            // display circular area
            showCircularArea(hackathonMap, data)

            weatherDataDiv.innerHTML = `${weaInformation(data).fullResults}<br/>`

            // Real time and display
            const realTimeDetail = document.getElementById('realTimeDetail')
            setInterval(() => {
                if (realTimeDetail) realTimeDetail.innerHTML = mapRealTime(weaInformation(data).placeZoneNum)
            }, 1000);

        })
        .catch(err => {
            alert(`Fetching weather data was not resolve: ${err.message}`)
        })
})

hackathonMap.addEventListener('tap', evt => {

    selectionLNG = undefined
    selectionLAT = undefined

    parametersSnackBar.style.display = 'block'
    parametersSnackBar.className = "reveal"

    tapPosition = hackathonMap.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
    )

    if (areaCoverage) hackathonMap.removeObject(areaCoverage)
    if (summaryDiv) summaryDiv.remove()

})

if (townSelection) {
    townSelection.addEventListener('change', () => {

        tapPosition = undefined

        parametersSnackBar.style.display = 'block'
        parametersSnackBar.className = "reveal"

        selectionCOORDS = JSON.parse(townSelection.value)['coordinates'][0]
        selectionLNG = selectionCOORDS[0]
        selectionLAT = selectionCOORDS[1]

        if (areaCoverage) hackathonMap.removeObject(areaCoverage)
        if (summaryDiv) summaryDiv.remove()

    })
}


clearMap.addEventListener('click', () => {

    if (areaCoverage) hackathonMap.removeObject(areaCoverage)
    if (summaryDiv) summaryDiv.remove()

})

worldView.addEventListener('click', () => {

    const midPoint = new H.map.Circle({ lat: 0, lng: 0 }, 1);

    // zoom map to circle
    // get the shape's bounding box and adjust the camera position
    hackathonMap.getViewModel().setLookAtData({
        zoom: 2.5,
        bounds: midPoint.getBoundingBox()
    });

})



submitParameters.addEventListener('click', () => {

    if (weatherDataDiv) weatherDataDiv.innerHTML = ''

    if (parametersSnackBar.className === "reveal") {
        parametersSnackBar.className = parametersSnackBar.className.replace("reveal", "conceal");
    }

    if (parametersSnackBar.className === "") {
        parametersSnackBar.className = parametersSnackBar.className.replace("", "conceal");
    }

    setTimeout(() => {
        parametersSnackBar.style.display = 'none'
    }, 500)

})



const mapEvents = new H.mapevents.MapEvents(hackathonMap)
const behavior = new H.mapevents.Behavior(mapEvents);
const ui = H.ui.UI.createDefault(hackathonMap, defaultLayers)
window.addEventListener('resize', () => hackathonMap.getViewPort().resize())
window.addEventListener('resize', () => hackathonMap.getViewPort().resize())