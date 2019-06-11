function fetchDarkSky() {
  var url = 'https://api.darksky.net/forecast/API_KEY/40.444546,%20-79.958903?exclude=minutely,hourly,daily,alerts,flags';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  var time_now_string = Utilities.formatDate(new Date(), "US/Eastern", "yyyy-MM-dd HH:mm:ss"); 

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var values = [time_now_string, 
                data.currently.summary,
                data.currently.precipProbability,
                data.currently.visibility,
                data.currently.windGust,
                data.currently.precipIntensity,
                data.currently.precipIntensityError,
                data.currently.icon,
                data.currently.cloudCover,
                data.currently.windBearing,
                (data.currently.apparentTemperature - 32)*5/9,
                data.currently.pressure,
                (data.currently.dewPoint - 32)*5/9,
                data.currently.ozone,
                data.currently.nearestStorm,
                data.currently.Distance,
                data.currently.precipType,
                (data.currently.temperature - 32)*5/9,
                data.currently.humidity,
                data.currently.time,
                data.currently.windSpeed,
                data.currently.uvIndex,]
  
  sheet.appendRow(values);
  
  //if (data.currently.icon == "rain"){
  //    MailApp.sendEmail("XXXXX@gmail.com", "DarkSky " + time_now_string + " " + data.currently.icon, JSON.stringify(data.currently));
  //};
  
}

