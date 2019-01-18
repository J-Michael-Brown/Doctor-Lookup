doctors(locationCoord = '45.542863,-122.7944704,11') {
  $.ajax({
    url: 'https://api.betterdoctor.com/2016-03-01/doctors?',
    type: 'GET',
    data: {
      user_key: process.env.exports.apiKey,
      location: locationCoord
    },
    success: function(response) {
      return response;
    },
    error: function() {
      return false;
    }
  });
}

export { doctors };
