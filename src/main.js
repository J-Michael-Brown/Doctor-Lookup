import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { DoctorList } from './doctor-list.js';
import { Doctor } from './doctor.js';
import { Meta } from './meta.js';

$(document).ready(function() {
  $.ajax({
    url: 'https://api.betterdoctor.com/2016-03-01/conditions?',
    type: 'GET',
    data: {
      user_key: process.env.exports.apiKey
    },
    success: function(response) {
      response.data.forEach(function(condition) {
        $('#conditions').append(`<option value="${condition.uid}">${condition.name}<option>`);
      });
      acceptFormSubmission();
    },
    error: function() {

    }
  });

  // function expandSpecialty() {
  //   $('.specialty-title').on('click', function(event) {
  //     event.preventDefault();
  //     const baseId = $(this).attr('id');
  //     $(`#${baseId}-description`).slideToggle();
  //   });
  // }

  function acceptFormSubmission() {
    $('#query-form').submit(function(event) {
      event.preventDefault();
      const query = $('#conditions option:selected').attr('value');
      let doctors = [];
      const meta = new Meta(query);
      console.log(query);
      $.ajax({
        url: meta.url,
        type: 'GET',
        data: {
          query: meta.query,
          user_key: process.env.exports.apiKey
        },
        success: function(response) {
          if(response.meta.error){
            console.log(`${response.meta.message}`);
          } else {
            response.data.forEach(function(doctorSnippet) {
              doctors.push(new Doctor(doctorSnippet));
            });
            displayDoctors(doctors);
          }

        },
        error: function() {
          console.log('api call failure');
        }
      });
    });

  }

  function displayDoctors(doctorList) {
    $('query-form').hide();
    doctorList.forEach(function(doctor, doctorIndex) {
      $('#doctors').append(`<dt id="${doctorIndex}">${doctor.profile.first_name} ${doctor.profile.middle_name}. ${doctor.profile.last_name}</dt>`);
      $('#doctors').append(`<dd class="extended-bio" id="${doctorIndex}-info"><dd>`);
      doctor.practices.forEach(function(practice) {
        $(`#${doctorIndex}-info`).append(`<a href="${practice.website}">${practice.name}<a><br>`);
      });
      $(`#${doctorIndex}-info`).append(`<p>${doctor.profile.bio}</p>`);
    });

    $('dt').on('click', function(event) {
      event.preventDefault();
      const doctorID = $(this).attr('id');
      $(`#${doctorID}-info`).slideToggle();
    });
  }

});
