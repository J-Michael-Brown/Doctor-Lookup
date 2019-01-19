import $ from 'jquery';
import { Doctor } from './doctor.js';

class DoctorList {
  constructor(meta = false) {
    this.doctors = [];
    this.meta = meta;
    if(meta) {
      this.getDoctors(meta);
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
    const updatedDoctors = [];

    let promise = new Promise(function(success, failure) {
      $.ajax({
        url: meta.url,
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
            response.data.forEach(function(doctorSnippet) {
              updatedDoctors.push(new Doctor(doctorSnippet));
            });
            console.log(`first doctor's first name ${updatedDoctors[0].profile.first_name}`);
            // console.log(`first doctor's last name (same call different position) ${updatedDoctors[0].profile.last_name}s`);
          }
        },
        error: function() {
          console.log('api call failure');
          apiCall = false;
        }
      });
    });
    promise.then(function(response) {
      debugger;
      return updatedDoctors;
    });

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
