import $ from 'jquery';

class DoctorList {
  constructor(meta = false) {
    this.doctors = [];
    if(meta) {
      this.getDoctors(meta);
      this.meta = meta
    }
    this.apiCallResponse = false;
    return this;
  }

  getDoctors(meta) {
    if (this.meta == meta) {
      return this.doctors;
    }
    this.meta = meta;
    let apiCall = this.apiCallResponse;
    let updatedDoctors = this.doctors;
    $.ajax({
      url: 'https://api.betterdoctor.com/2016-03-01/doctors?',
      type: 'GET',
      data: {
        user_key: process.env.exports.apiKey,
        query: meta.query
      },
      success: function(response) {
        if(response.meta.error){
          console.log(`${response.meta.message}`);
        } else {
          apiCall = response;
          response.data.forEach(function(doctor) {
            updatedDoctors.push(doctor);
          });
          console.log(`getDoctors() successfull api call`);
        }
      },
      error: function() {
        console.log('api call failure');
        apiCall = false;
      }
    });
    console.log(this.doctors[0]);
    return this.doctors;
  }

  doctorsByName(name) {
    const doctorsWithName = [];
    this.doctors.forEach(function(doctor) {
      if (doctor.profile.first_name.toLowerCase().includes(name) || doctor.profile.last_name.toLowerCase().includes(name) || doctor.profile.middle_name.toLowerCase().includes(name)) {
        doctorsWithName.push(doctor);
      }
    });
    return doctorsWithName;
  }
}

export { DoctorList };
