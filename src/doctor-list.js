import $ from 'jquery';

class DoctorList {
  constructor(coordinates = '45.542863,-122.7944704,11') {
    this.doctors = [];
    this.getDoctors(coordinates);
    return this;
  }

  getDoctors(locationCoord = '45.542863,-122.7944704,11', skipAmount = 0) {
    let apiCall = this.apiCall;
    let updatedDoctors = this.doctors;
    $.ajax({
      url: 'https://api.betterdoctor.com/2016-03-01/doctors?',
      type: 'GET',
      data: {
        user_key: process.env.exports.apiKey,
        skip: skipAmount,
        location: locationCoord
      },
      success: function(response) {
        apiCall = response;
        apiCall.data.forEach(function(doctor) {
          updatedDoctors.push(doctor);
        });
      },
      error: function() {
        apiCall = false;
      }
    });
    return this.doctors;
  }

  doctorsByName(name) {
    doctorsWithName = [];
    this.doctors.forEach(function(doctor) {
      if (doctor.profile.first_name.toLowerCase().includes(name) || doctor.profile.last_name.toLowerCase().includes(name) || doctor.profile.middle_name.toLowerCase().includes(name)) {
        doctorsWithName.push(doctor);
      }
    });
    return doctorsWithName;
  }
}

export { DoctorList };
