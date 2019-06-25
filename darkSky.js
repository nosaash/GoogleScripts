/*
This fetch the current weather data from Dark Sky API to a Google Spreadsheet.
Need to obtain own API key for the request. Free tier can do 1000 requests per day. 
*/

function fetchDarkSky() {
  //the exclude is to shorten the total API response. 
  var url = 'https://api.darksky.net/forecast/API_KEY/41.444546,%20-78.958903?exclude=minutely,hourly,daily,alerts,flags';
  
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  var time_now_string = Utilities.formatDate(new Date(), "US/Eastern", "yyyy-MM-dd HH:mm:ss"); 

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  
  //Details of the response: https://darksky.net/dev/docs#response-format
  var values = [time_now_string, 
                data.currently.summary, //cloudy, drizzling, etc. 
                data.currently.precipProbability, 
                data.currently.visibility, //miles
                data.currently.windGust, //mph
                data.currently.precipIntensity,
                data.currently.precipIntensityError,
                data.currently.icon,
                data.currently.cloudCover,
                data.currently.windBearing, //wind direction, 0 deg is north. Progressing clockwise. 
                (data.currently.apparentTemperature - 32)*5/9, //apparent (feels like) temperature converted to Celcius
                data.currently.pressure,
                (data.currently.dewPoint - 32)*5/9, //dew point temperature converted to Celcius
                data.currently.ozone,
                data.currently.nearestStorm,
                data.currently.Distance,
                data.currently.precipType,
                (data.currently.temperature - 32)*5/9, //temperature converted to Celcius
                data.currently.humidity, 
                data.currently.time,
                data.currently.windSpeed,
                data.currently.uvIndex,]
  
  sheet.appendRow(values);
  
  if (data.currently.icon == "rain"){
      MailApp.sendEmail("XXXXX@gmail.com", 
                        "DarkSky " + time_now_string + " " + data.currently.icon, 
                        JSON.stringify(data.currently));
  };
  
}

