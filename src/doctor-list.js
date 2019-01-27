import $ from 'jquery';
import { Doctor } from './doctor.js';

  getResponse(meta) {
    const doctors = [];

    let promise = new Promise(function(success, failure) {
      $.ajax({
        url: meta.url,
        type: 'GET',
        data: mata.data,
        success: function(response) {
          return response;
        },
        error: function() {
          console.log('api call failure');
          apiCall = false;
        }
      });
    });
    promise.then(function(response) {
      debugger;
      return doctors;
    });

  }


  //
  // doctorsByName(name) {
  //   const doctorsWithName = [];
  //   doctors.forEach(function(doctor) {
  //     if (doctor.profile.first_name.toLowerCase().includes(name) || doctor.profile.last_name.toLowerCase().includes(name) || doctor.profile.middle_name.toLowerCase().includes(name)) {
  //       doctorsWithName.push(doctor);
  //     }
  //   });
  //   return doctorsWithName;
  // }


export { getResponse };
