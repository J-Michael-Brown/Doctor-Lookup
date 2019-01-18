import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { doctors } from './database-search.js';

$(document).ready(function() {
  let localDoctors = doctors();
  if (localDoctors) {
    if(localDoctors.meta.error){
      console.log(localDoctors.meta.message);
    } else {
      // let doctors = [];
      localDoctors.data.forEach(function(doctor) {
        // doctor.practices.forEach(function(practice) {
          //
          // });
          console.log(`${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}`);
          doctor.specialties.forEach(function(specialty) {
            console.log(specialty.actor);
          });
        })
        // return doctors;
      }
  } else {
    console.log("API call fail.");
  }

});
