var apiURL = 'http://api.openweathermap.org/data/2.5/weather?id=2189623&appid=a63daaeca5904315fcc18a55d15e9b0c&units=metric';

var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=2189623&appid=a63daaeca5904315fcc18a55d15e9b0c&units=metric';

Vue.filter('dateShort', function (value) {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(value);
  var day = moment(d).format('dddd')
  return day;
});

Vue.filter('icon', function (value) {
  return '<i class="wi wi-owm-' + value + '"></i>';
});

Vue.filter('icon-wind', function (value) {
  return '<i class="wi wi-wind from-' + value + '-deg"></i>';
});

/**
 * Vue filter to round the decimal to the given place.
 * http://jsfiddle.net/bryan_k/3ova17y9/
 *
 * @param {String} value    The value string.
 * @param {Number} decimals The number of decimal places.
 */
Vue.filter('round', function(value, decimals) {
  if(!value) {
    value = 0;
  }

  if(!decimals) {
    decimals = 0;
  }

  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return value;
});


new Vue({
  el: '#app',
  data: {
    weatherData: '',
    forecastData: ''
  },

  created: function () {
    this.$http.get(apiURL).then((response) => {
      this.$set('weatherData', response.body );
    }, (response) => {
          // error callback
    });
    this.$http.get(forecastURL).then((response) => {
      this.$set('forecastData', response.body );
    }, (response) => {
          // error callback
    });

  },

  // computed: {
  //   iconUrl: function() {
  //     forecastData.
  //   }
  // }

  // computed: {

  // }

})