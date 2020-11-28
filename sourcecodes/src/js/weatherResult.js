// Units
let distUnit, speedUnit, tempUnit, forecastType

const inputParameters = () => {

    const forecastPeriodValue = document.querySelector('#forecastPeriod').value
    const measurementUnitsValue = document.querySelector('#measurementUnits').value
    const languageValue = document.querySelector('#language').value

    let units
    let lang
    let part

    const measurementUnits = {
        imperial: 'imperial',
        metric: 'metric'
    }

    switch (measurementUnitsValue) {
        case "imperial":
            units = measurementUnits.imperial;
            distUnit = 'miles'
            speedUnit = 'miles/hour'
            tempUnit = 'Fahrenheit'

            break;
        case "metric":
            units = measurementUnits.metric;
            distUnit = 'meters'
            speedUnit = 'meters/sec'
            tempUnit = 'Deg Celcius'
            break;
        default:
            units = measurementUnits.metric;
    }

    const languages = {
        English: 'en',
        German: 'de',
        French: 'fr',
        Chinese: 'zh_cn'
    }

    switch (languageValue) {
        case "en":
            lang = languages.English;
            break;
        case "de":
            lang = languages.German;
            break;
        case "fr":
            lang = languages.French;
            break;
        case "zh_cn":
            lang = languages.Chinese;
            break;
        default:
            lang = languages.English;
    }

    const forecastPeriod = {
        currentWeather: 'minutely,hourly,daily',
        minutelyHalfHour: 'current,hourly,daily',
        hourlySixHours: 'current,minutely,daily',
        dailyThreeDays: 'current,minutely,hourly'
    }

    switch (forecastPeriodValue) {
        case "currentWeather":
            part = forecastPeriod.currentWeather
            forecastType = 'Information for Current Weather'
            break;
        case "minutelyHalfHour":
            part = forecastPeriod.minutelyHalfHour;
            forecastType = 'Minutely forecast for the next Half Hour'
            break;
        case "hourlySixHours":
            part = forecastPeriod.hourlySixHours;
            forecastType = 'Hourly forecast for the next Six Hours'
            break;
        case "dailyThreeDays":
            part = forecastPeriod.dailyThreeDays;
            forecastType = 'Daily forecast for the next Three Days'
            break;
        default:
            part = forecastPeriod.currentWeather;
            forecastType = 'Information for Current Weather'
    }

    return {
        units: units,
        lang: lang,
        part: part
    }
}

const weaInformation = data => {

    let place, timezone, timezone_offset, timezoneNum, currentWeather, forecastTime, sunriseTime, sunsetTime,
        temperature, tempFeels, atmPressure, humidity, tempDewPoint, cloudiness, visibility, wind_speed,
        wind_deg, rain, lastHrRain, snow, lastHrSnow, currentWeatherObject, weaMain, weaDescr

    let middayUVindex, minutelyWeather, hourlyWeather, dailyWeather, keyAlerts, alertsObject, alertSender, alertEvent, alertDescription


    for (let items in data) {
        if (items === "timezone") place = data[items]
        if (items === "timezone_offset") timezone_offset = Number(data[items])
        if (items === "current") currentWeather = data[items] // Object
        if (items === "minutely") minutelyWeather = data[items] // Object
        if (items === "hourly") hourlyWeather = data[items] // Object
        if (items === "daily") dailyWeather = data[items] // Object
        if (items === "alerts") keyAlerts = data[items] // Object
    }


    let alertMessage = ''

    if (keyAlerts) {

        for (let als = 0; als < keyAlerts.length; als++) {

            alertMessage += `<h1 style="margin: 25px 0 15px;" class="whiteColor">Alert message: ${als + 1}</h1>`

            alertsObject = keyAlerts[als]

            alertSender = alertsObject["sender_name"]
            alertEvent = alertsObject["event"]
            alertDescription = alertsObject["description"]

            alertMessage += `Source: ${alertSender}<br/>
                                Description: ${alertEvent}<br/>
                                Details: ${alertDescription}<br/>`

        }
    }



    // Current Forecast Weather Information
    for (let w in currentWeather) {
        if (w === "dt") forecastTime = Number(currentWeather[w])
        if (w === "sunrise") sunriseTime = Number(currentWeather[w])
        if (w === "sunset") sunsetTime = Number(currentWeather[w])
        if (w === "temp") temperature = Number(currentWeather[w])
        if (w === "feels_like") tempFeels = Number(currentWeather[w])
        if (w === "pressure") atmPressure = currentWeather[w]
        if (w === "humidity") humidity = currentWeather[w]
        if (w === "dew_point") tempDewPoint = currentWeather[w]
        if (w === "clouds") cloudiness = currentWeather[w]
        if (w === "uvi") middayUVindex = currentWeather[w]
        if (w === "visibility") visibility = currentWeather[w]
        if (w === "wind_speed") wind_speed = Number(currentWeather[w])
        if (w === "wind_deg") wind_deg = currentWeather[w]
        if (w === "rain") rain = currentWeather[w] //Object
        if (w === "snow") snow = currentWeather[w] // Object
        if (w === "weather") currentWeatherObject = currentWeather[w] // Object

    }

    if (rain) {
        for (let r in rain) {
            if (r === "1h") lastHrRain = rain[r]
        }
    } else {
        lastHrRain = 'No rain in the past hour'
    }

    if (snow) {
        for (let s in snow) {
            if (s === "1h") lastHrSnow = snow[s]
        }
    } else {
        lastHrSnow = 'No snow in the past hour'
    }

    if (currentWeatherObject) {
        for (let wo = 0; wo < currentWeatherObject.length; wo++) {
            if (wo === 0) weaMain = currentWeatherObject[wo]["main"]
            if (wo === 0) weaDescr = currentWeatherObject[wo]["description"]
        }
    }

    // let coordinates = `Lat, Long => ${lat}, ${lon}`
    timezone = (timezone_offset === 0) ? `GMT ${timezone_offset} Hrs` :
        (timezone_offset < 0) ? `GMT -${Math.abs(timezone_offset) / 3600} Hrs` :
        `GMT +${timezone_offset / 3600} Hrs`

    timezoneNum = (timezone_offset === 0) ? timezone_offset :
        (timezone_offset < 0) ? -1 * (Math.abs(timezone_offset) / 3600) :
        timezone_offset / 3600


    let currentSummaryMesage = `
            <h1>Summarized Information for <span class="whiteColor">${place}</span></h1>
            Real Time: <span id="realTimeSummary"></span><br/>
            Forecast time: ${forecastTime}<br/>

            Temperature: ${temperature} ${tempUnit}<br/>
            Description: <span style="text-transform: capitalize;">${weaDescr}</span><br/>
            Rain volume (mm): ${lastHrRain}<br/>
            Snow volume (mm): ${lastHrSnow}<br/><br/>
            Click here to <a href="#displayWeatherData">See Detailed Information</a>
            `

    let currentFullResultsMesage =
        `
        <h1><span class="whiteColor">DETAILED ${forecastType}</span></h1>
        <p class="smallHeader">Place Details</p>
        Place: <span class="whiteColor">${place}</span><br/>
        Timezone: <span class="whiteColor">${timezone}</span><br/>
        Current time: <span id="realTimeDetail" class="whiteColor"></span><br/>
        Forecast time: <span class="whiteColor">${forecastTime}</span><br/><br/>
        
        <p class="smallHeader"> Forecast Results</p>
        Sunrise time: <span class="whiteColor">${sunriseTime}</span><br/>
        Sunset time: <span class="whiteColor">${sunsetTime}</span><br/>
        Temperature: <span class="whiteColor">${temperature} ${tempUnit}</span><br/>
        Temperature feels like: <span class="whiteColor">${tempFeels} ${tempUnit}</span><br/>
        Atmospheric pressure: <span class="whiteColor">${atmPressure} hPa</span><br/>
        Humidity: <span class="whiteColor">${humidity}%</span><br/>
        Dew-point temperature: <span class="whiteColor">${tempDewPoint} ${tempUnit}</span><br/>
        Cloudiness: <span class="whiteColor">${cloudiness}%</span><br/>
        Midday UV index: <span class="whiteColor">${middayUVindex}</span><br/>
        Average Visibility: <span class="whiteColor">${visibility}  meters</span><br/>
        Wind speed <span class="whiteColor">${wind_speed} ${speedUnit}</span><br/>
        Wind direction: <span class="whiteColor">${wind_deg}</span><br/>
        Overview: <span class="whiteColor">${weaMain}</span><br/>
        Description: <span class="whiteColor" style="text-transform: capitalize;">${weaDescr}</span><br/>
        Rain volume (mm): <span class="whiteColor">${lastHrRain}</span><br/>
        Snow volume (mm): <span class="whiteColor">${lastHrSnow}</span><br/><br/>
        ${alertMessage}
        `


    // 30 minute Minutely Forecast Weather Information
    let minutelySummaryMesage = `<h1>Summarized Information for <span class="whiteColor">${place}</span></h1>
                                    Current time: <span id="realTimeSummary"></span>`
    let minutelyFullResultsMesage = `<h1><span class="whiteColor">DETAILED ${forecastType}</span></h1>`


    if (minutelyWeather) {


        let minutelyForecastTime, minutelyPrecipitation

        for (let i = 0; i < 30; i++) {

            minutelyFullResultsMesage += `<p class="whiteColor centerText">Minute ${i + 1}</p>`

            minutelyForecastTime = minutelyWeather[i]['dt']
            minutelyPrecipitation = minutelyWeather[i]["precipitation"]

            minutelyFullResultsMesage += `Forecast time: <span class="whiteColor">${minutelyForecastTime}</span><br/>
                                            Atmospheric Precipitation volume, mm: <span class="whiteColor">${minutelyPrecipitation} hPa</span><br/><br/>`


            if (i === 0 || i === 29) {
                minutelySummaryMesage += `<p style="margin: 5px;" class="centerText">Forecast for minute: ${i + 1}</p>`
                minutelySummaryMesage += `Forecast time: <span class="whiteColor">${minutelyForecastTime}</span><br/>
                                        Precipitation volume, mm: <span class="whiteColor">${minutelyPrecipitation} hPa</span><br/>`
            }

        }

        minutelyFullResultsMesage += `${alertMessage}`



    } else {
        minutelySummaryMesage += "Forecast requested is unavailable for this region.<br/><br/>"
        minutelyFullResultsMesage += "The kind of forecast requested is unavailable for this region."
    }

    minutelySummaryMesage += 'Click here to <a href="#displayWeatherData"> See Detailed Information </a>'



    let hourlyFullResultsMesage = `<h1><span class="whiteColor">DETAILED ${forecastType}</span></h1>
                                    <h1 style="font-size: large;" class="whiteColor centerText"> Forecast Results</h1>
                                    Current time: <span class="whiteColor" id="realTimeSummary"></span><br/><br/>`
    let hourlySummaryMesage = `<h1>Summarized Information for <span class="whiteColor">${place}</span></h1>`


    if (hourlyWeather) {


        let hourlyForecastTime, hourlyTemp, hourlyTempFeels, hourlyPressure, hourlyHumidity, hourlyDewpoint, hourlyCloudiness,
            hourlyVisibility, hourlyWindSpeed, hourlyWindDeg, hourlyRain, hourlySnow, hourlyWeatherObject, hourlyWeaMain,
            hourlyWeaDescr, hourlyRainVol, hourlySnowVol

        hourlyFullResultsMesage +=
            `
                <p class="smallHeader">Place Details</p>
                Place: <span class="whiteColor">${place}</span><br/>
                Timezone: <span class="whiteColor">${timezone}</span><br/>
                Current time: <span id="realTimeDetail" class="whiteColor"></span><br/><br/><br/>
                `

        for (let i = 0; i < 6; i++) {

            hourlyFullResultsMesage += `<p class="centerText textUnderline">Forecast for hour <span class="whiteColor">${i + 1}</span></p>`

            hourlyForecastTime = Number(hourlyWeather[i]["dt"])
            hourlyTemp = Number(hourlyWeather[i]["temp"])
            hourlyTempFeels = Number(hourlyWeather[i]["feels_like"])
            hourlyPressure = Number(hourlyWeather[i]["pressure"])
            hourlyHumidity = Number(hourlyWeather[i]["humidity"])
            hourlyDewpoint = Number(hourlyWeather[i]["dew_point"])
            hourlyCloudiness = Number(hourlyWeather[i]["clouds"])
            hourlyVisibility = hourlyWeather[i]["visibility"]
            hourlyWindSpeed = Number(hourlyWeather[i]["wind_speed"])
            hourlyWindDeg = Number(hourlyWeather[i]["wind_deg"])
            hourlyRain = hourlyWeather[i]["rain"]
            hourlySnow = hourlyWeather[i]["snow"]
            hourlyWeatherObject = hourlyWeather[i]["weather"]

            if (hourlyRain) {
                hourlyRainVol = hourlyRain["1h"]
            } else {
                hourlyRainVol = 'No rain'
            }

            if (hourlySnow) {
                hourlySnowVol = hourlySnow["1h"]
            } else {
                hourlySnowVol = 'No snow'
            }

            if (hourlyWeatherObject) {
                for (let wo = 0; wo < hourlyWeatherObject.length; wo++) {
                    if (wo === 0) hourlyWeaMain = hourlyWeatherObject[wo]["main"]
                    if (wo === 0) hourlyWeaDescr = hourlyWeatherObject[wo]["description"]
                }
            }



            hourlyFullResultsMesage +=
                `
                Forecast time: <span class="whiteColor">${hourlyForecastTime}</span><br/>
                Temperature: <span class="whiteColor">${hourlyTemp} ${tempUnit}</span><br/>
                Temperature will feel like: <span class="whiteColor">${hourlyTempFeels} ${tempUnit}</span><br/>
                Atmospheric pressure: <span class="whiteColor">${hourlyPressure} hPa</span><br/>
                Humidity: <span class="whiteColor">${hourlyHumidity}%</span><br/>
                Dew-point temperature: <span class="whiteColor">${hourlyDewpoint} ${tempUnit}</span><br/>
                Cloudiness: <span class="whiteColor">${hourlyCloudiness}%</span><br/>
                Visibility: <span class="whiteColor">${hourlyVisibility} meters</span><br/>
                Wind speed <span class="whiteColor">${hourlyWindSpeed} ${speedUnit}</span><br/>
                Wind direction: <span class="whiteColor">${hourlyWindDeg} degrees (meteorological)</span><br/>
                Overview: <span class="whiteColor">${hourlyWeaMain}</span><br/>
                Description: <span class="whiteColor" style="text-transform: capitalize;">${hourlyWeaDescr}</span><br/>
                Rain volume (mm): <span class="whiteColor">${hourlyRainVol}</span><br/>
                Snow volume (mm): <span class="whiteColor">${hourlySnowVol}</span><br/><br/>
                `


            if (i === 0 || i === 2 || i === 5) {
                hourlySummaryMesage += `<p class="centerText whiteColor">In the next ${i + 1} Hr(s)</p>`
                hourlySummaryMesage += `Temperature: <span class="whiteColor">${hourlyTemp} ${tempUnit}</span><br/>
                                    Description: <span class="whiteColor" style="text-transform: capitalize;">${hourlyWeaDescr}</span><br/>
                                    Rain volume (mm): <span class="whiteColor">${hourlyRainVol}</span><br/>
                                    Snow volume (mm): <span class="whiteColor">${hourlySnowVol}</span><br/><br/>
                                `
            }
        }

    } else {
        hourlySummaryMesage += "The kind of forecast requested is unavailable for this region.<br/><br/>"
        hourlyFullResultsMesage += "The kind of forecast requested is unavailable for this region."
    }
    hourlySummaryMesage += 'Click here to <a href = "#displayWeatherData" > See Detailed Information </a>'
    hourlyFullResultsMesage += `${alertMessage}`



    let dailySummaryMesage = `<h1>Summarized Information for <span class="whiteColor">${place}</span></h1>
                                Current time: <span id="realTimeSummary"></span><br/><br/>`
    let dailyFullResultsMesage = `<h1><span class="whiteColor">DETAILED ${forecastType}</span></h1>
                                <h1 style="font-size: large;" class="whiteColor centerText"> Forecast Results</h1>
                                `

    if (dailyWeather) {

        let dailyForecastTime, dailySunriseTime, dailySunsetTime, dailyTemp, dailyPressure, dailyHumidity, dailyDewpoint, dailyCloudiness,
            dailyVisibility, dailyWindSpeed, dailyWindDeg, dailyRain, dailySnow, dailyWeatherObject, dailyWeaMain,
            dailyWeaDescr, dailyRainVol, dailySnowVol

        let dailyMornTemp, dailyDayTemp, dailyEveTemp, dailyNightTemp, dailyMinTemp, dailyMaxTemp

        dailyFullResultsMesage +=
            `
                <p class="smallHeader">Place Details</p>
                Place: <span class="whiteColor">${place}</span><br/>
                Timezone: <span class="whiteColor">${timezone}</span><br/>
                Current time: <span id="realTimeDetail" class="whiteColor"></span><br/><br/>`

        for (let i = 0; i < 3; i++) {

            dailyFullResultsMesage += `<p class="centerText textUnderline">Forecast for Day <span class="whiteColor">${i + 1}</span></p>`


            dailyForecastTime = Number(dailyWeather[i]["dt"])
            dailySunriseTime = Number(dailyWeather[i]["sunrise"])
            dailySunsetTime = Number(dailyWeather[i]["sunset"])
            dailyTemp = dailyWeather[i]["temp"]
            dailyPressure = Number(dailyWeather[i]["pressure"])
            dailyHumidity = Number(dailyWeather[i]["humidity"])
            dailyDewpoint = Number(dailyWeather[i]["dew_point"])
            dailyWindSpeed = Number(dailyWeather[i]["wind_speed"])
            dailyWindDeg = Number(dailyWeather[i]["wind_deg"])
            dailyCloudiness = Number(dailyWeather[i]["clouds"])
            dailyCloudiness = Number(dailyWeather[i]["uvi"])
            dailyVisibility = dailyWeather[i]["visibility"]
            dailyRain = dailyWeather[i]["rain"]
            dailySnow = dailyWeather[i]["snow"]
            dailyWeatherObject = dailyWeather[i]["weather"]


            dailyMornTemp = dailyTemp['morn']
            dailyDayTemp = dailyTemp['day']
            dailyEveTemp = dailyTemp['eve']
            dailyNightTemp = dailyTemp['night']
            dailyMinTemp = dailyTemp['min']
            dailyMaxTemp = dailyTemp['max']


            if (dailyRain) {
                dailyRainVol = dailyRain["1h"]
            } else {
                dailyRainVol = 'No rain'
            }

            if (dailySnow) {
                dailySnowVol = snow["1h"]
            } else {
                dailySnowVol = 'No snow'
            }

            if (dailyWeatherObject) {
                dailyWeaMain = dailyWeatherObject[0]["main"]
                dailyWeaDescr = dailyWeatherObject[0]["description"]
            }



            dailyFullResultsMesage +=
                `
                Forecast time: <span class="whiteColor">${dailyForecastTime}</span><br/>
                Sunrise time: <span class="whiteColor">${dailySunriseTime}</span><br/>
                Sunset time: <span class="whiteColor">${dailySunsetTime}</span><br/>
                Morning Temperature: <span class="whiteColor">${dailyMornTemp} ${tempUnit}</span><br/>
                Day Temperature: <span class="whiteColor">${dailyDayTemp} ${tempUnit}</span><br/>
                Evening Temperature: <span class="whiteColor">${dailyEveTemp} ${tempUnit}</span><br/>
                Night Temperature: <span class="whiteColor">${dailyNightTemp} ${tempUnit}</span><br/>
                Maximum Temperature: <span class="whiteColor">${dailyMaxTemp} ${tempUnit}</span><br/>
                Minimum Temperature: <span class="whiteColor">${dailyMinTemp} ${tempUnit}</span><br/>
                Atmospheric pressure: <span class="whiteColor">${dailyPressure} hPa</span><br/>
                Humidity: <span class="whiteColor">${dailyHumidity}%</span><br/>
                Dew-point temperature: <span class="whiteColor">${dailyDewpoint} ${tempUnit}</span><br/>
                Cloudiness: <span class="whiteColor">${dailyCloudiness}%</span><br/>
                Average Visibility: <span class="whiteColor">${dailyVisibility} meters</span><br/>
                Wind speed <span class="whiteColor">${dailyWindSpeed} ${speedUnit}</span><br/>
                Wind direction: <span class="whiteColor">${dailyWindDeg} degrees (meteorological)</span><br/>
                Overview: <span class="whiteColor">${dailyWeaMain}</span><br/>
                Description: <span class="whiteColor" style="text-transform: capitalize;">${dailyWeaDescr}</span><br/>
                Rain volume (mm): <span class="whiteColor">${dailyRainVol}</span><br/>
                Snow volume (mm): <span class="whiteColor">${dailySnowVol}</span><br/><br/>
                `


            if (i === 0 || i === 2) {
                dailySummaryMesage += `<p class="centerText">Day ${i + 1} forecast</p>`
                dailySummaryMesage += `Maximum Temperature: <span class="whiteColor">${dailyMaxTemp} ${tempUnit}</span><br/>
                                    Minimum Temperature: <span class="whiteColor">${dailyMinTemp} ${tempUnit}</span><br/>
                                    Description: <span class="whiteColor" style="text-transform: capitalize;">${dailyWeaDescr}</span><br/>
                                    Rain volume (mm): <span class="whiteColor">${dailyRainVol}</span><br/><br/>
                                `
            }
        }
    } else {
        dailySummaryMesage += "The kind of forecast requested is unavailable for this region.<br/><br/>"
        dailyFullResultsMesage += "The kind of forecast requested is unavailable for this region."
    }
    dailySummaryMesage += 'Click here to <a href = "#displayWeatherData" > See Detailed Information </a>'
    dailyFullResultsMesage += `${alertMessage}`



    const neededDetailedContents = info => (info === 'Information for Current Weather') ? currentFullResultsMesage :
        (info === 'Minutely forecast for the next Half Hour') ? minutelyFullResultsMesage :
        (info === 'Hourly forecast for the next Six Hours') ? hourlyFullResultsMesage :
        (info === 'Daily forecast for the next Three Days') ? dailyFullResultsMesage :
        'Somehow we did not capture the Forecast type you need!'


    const neededSummaryContents = info => (info === 'Information for Current Weather') ? currentSummaryMesage :
        (info === 'Minutely forecast for the next Half Hour') ? minutelySummaryMesage :
        (info === 'Hourly forecast for the next Six Hours') ? hourlySummaryMesage :
        (info === 'Daily forecast for the next Three Days') ? dailySummaryMesage :
        'Somehow we did not capture the Forecast type you need!'

    return {
        fullResults: neededDetailedContents(forecastType),
        summaryResults: neededSummaryContents(forecastType),
        placeZoneNum: timezoneNum
    }
}


export { weaInformation, inputParameters }