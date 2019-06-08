function fetchOpenWeather() {
  var url = 'http://api.openweathermap.org/data/2.5/weather?id=5206379&appid={{ API KEY }}';
  var response = UrlFetchApp.fetch(url);
  
  //print out the full response. 
  Logger.log(response);

  //data is the parsed json of the response
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  //get weather_id
  //details for the codes: https://openweathermap.org/weather-conditions
  var weather_id = JSON.stringify(data.weather[0]).split(",")[0].split(":")[1].split("]")[0];
  Logger.log(weather_id);
  
  var time_now_string = Utilities.formatDate(new Date(), "US/Eastern", "yyyy-MM-dd HH:mm:ss"); 
  //Logger.log(Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd HH:mm:ss"));
  //Logger.log(time_now_string);
  //Logger.log(data.weather);
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];

  var values = [time_now_string, data.weather[0], data.coord, data.base, data.main, data.visibility, 
                data.wind, data.cloud, data.dt, data.sys, data.timezone, data.id, data.name, data.cod]
  
  sheet.appendRow(values);
  
  if (weather_id < 800){
      MailApp.sendEmail({{ EMAIL TO }}, {{ TITLE }}, {{ MAIL BODY }});
  };
  
}
