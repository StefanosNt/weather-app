function roundToPoint5(val){
  return (Math.round(val*2)/2);
}
function getLocation(){
  var location;
  $.ajax({
    async: false,
    url: "http://ipinfo.io/json",
    success: function(json) {
        location=json; 
    }
  });
  return location;
}
function getWeather(loc){
  var loc = {};
  var weather = {};
  
  loc = getLocation();
  
  //add your own API KEY from openweathermap.org
  var APIKEY = "48f68ebc8662b6a7fe70afb434762b04";
  var url = "http://api.openweathermap.org/data/2.5/weather?q="+loc.city+","+loc.country+"&appid="+APIKEY;
  // console.log(url);
  $.ajax({
    async:false,
    url: url,
    success: function(json){
      weather.tempC = roundToPoint5(json.main.temp - 273.15);
      weather.tempCmin = roundToPoint5(json.main.temp_min - 273.15);
      weather.tempCmax = roundToPoint5(json.main.temp_max - 273.15);
      weather.tempF = roundToPoint5((json.main.temp_min -273)*1.8 + 32);
      weather.tempFmin = roundToPoint5((json.main.temp_min -273)*1.8 + 32);
      weather.tempFmax = roundToPoint5((json.main.temp_max -273)*1.8 + 32);
      weather.humidity = json.main.humidity+"%";
      weather.city = json.name;
      weather.country = json.sys.country;
      weather.condition = json.weather[0].main;
      weather.description = json.weather[0].description;
      weather.icon = "http://openweathermap.org/img/w/"+json.weather.icon+".png";
    }
  });
  
  return weather;
}
$(document).ready(function(){
  $("#fahrenheit").parent().hover(
    function(){
      $("#fahrenheit").parent().addClass("hover"); 
    },
    function(){
      $("#fahrenheit").parent().removeClass("hover");
    }); 
  $("#celcius").parent().hover(
    function(){
      $("#celcius").parent().addClass("hover"); 
    },
    function(){
      $("#celcius").parent().removeClass("hover");
    }); 
  
  weather = getWeather(location);
  // console.log(weather);
  $("#mainTemp").html(weather.tempC+"&#8451");
  $("#minTemp").html("min: "+ weather.tempCmin+"&#176");
  $("#maxTemp").html("max: "+ weather.tempCmax+"&#176"); 
  $("#humidity").html("humidity: "+weather.humidity);
  $("#city").html(weather.city+","+weather.country);
  $("#description").html(weather.description);
  
  $("#fahrenheit").click(function(){
    $("#mainTemp").html(weather.tempF+"&#8457");
    $("#minTemp").html("min: "+ weather.tempFmin+"&#176");
    $("#maxTemp").html("max: "+ weather.tempFmax+"&#176"); 
    $("#fahrenheit").parent().addClass("fahr");
    $("#celcius").parent().removeClass("celc");
  });
  $("#celcius").click(function(){
    $("#mainTemp").html(weather.tempC+"&#8451");
    $("#minTemp").html("min: "+ weather.tempCmin+"&#176");
    $("#maxTemp").html("max: "+ weather.tempCmax+"&#176"); 
    $("#celcius").parent().addClass("celc");
    $("#fahrenheit").parent().removeClass("fahr");
  }); 
  
  
  
  switch(weather.condition){
    case "Clouds":  
      $("#main").css("background","url(\"https://mir-s3-cdn-cf.behance.net/project_modules/disp/d241d716071075.562a50091d914.gif\")").css("background-size","cover");
      $("body").css("background","url(\"https://images.unsplash.com/photo-1472068113808-609faf3a6cf1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=f9deed7ef9bbfb091943e4ef429863ff\")").css("background-size","100% 100%").css("background-repeat","no-repeat");
      break;
    case "Thunderstorm":
    case "Extreme": 
      $("#main").css("background","url(\"https://mir-s3-cdn-cf.behance.net/project_modules/disp/58027c16071075.562a502d796a8.gif\")").css("background-size","cover");  
      $("body").css("background","url(\"https://images.unsplash.com/photo-1465799522714-8eb0e6fccf73?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=e37d5f31caf6776b5c75374000683a40\")").css("background-size","100% 100%").css("background-repeat","no-repeat");
      break;
    case "Snow":  
      $("#main").css("background","url(\"https://mir-s3-cdn-cf.behance.net/project_modules/disp/a2405c16071075.562a5050beed0.gif\")").css("background-size","cover");  
      $("body").css("background","url(\"https://images.unsplash.com/photo-1484856299450-fb14549bca50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=203ad6693d5d681dc1c98e922f346fcb\")").css("background-size","100% 100%").css("background-repeat","no-repeat");
      break;
    case "Rain":
    case "Drizzle":
      $("#main").css("background","url(\"https://mir-s3-cdn-cf.behance.net/project_modules/disp/7205bf16071075.562a50132e33e.gif\")").css("background-size","cover");  
      $("body").css("background","url(\"https://images.unsplash.com/photo-1421987392252-38a07781c07e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=ef7db5d9f57a084edaa7fc5da0cf3579\")").css("background-size","100% 100%").css("background-repeat","no-repeat");
      break;
    case "Clear":  
      $("#main").css("background","url(\"https://mir-s3-cdn-cf.behance.net/project_modules/disp/421f0c16071075.562a500e6ddd4.gif\")").css("background-size","cover");  
      $("body").css("background","url(\"https://images.unsplash.com/reserve/m6rT4MYFQ7CT8j9m2AEC_JakeGivens%20-%20Sunset%20in%20the%20Park.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=a5997eee6e3da2ce36290fe1eccbf800\")").css("background-size","100% 100%").css("background-repeat","no-repeat");
      break;
    case "Atmosphere":  
      $("#main").css("background","url(\"https://mir-s3-cdn-cf.behance.net/project_modules/disp/4d353e16071075.562a504473c5c.gif\")").css("background-size","cover");  
      $("body").css("background","url(\"http://inesperkovic.com/wp-content/uploads/2016/12/ines-perkovic-a-simple-hello-winter-alps-mist-clouds.jpg\")").css("background-size","100% 100%").css("background-repeat","no-repeat");
      break;
  }
});