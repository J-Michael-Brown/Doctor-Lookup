import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getResponse } from './doctor-list.js';
import { Doctor } from './doctor.js';
import { Meta } from './meta.js';

$(document).ready(function() {
  function failCall() {
    $('#error-message').text('API call failed');
  }
  let meta = new Meta({}, 'https://api.betterdoctor.com/2016-03-01/conditions?');

  getResponse(meta, acceptForm, failCall);

  // function expandSpecialty() {
  //   $('.specialty-title').on('click', function(event) {
  //     event.preventDefault();
  //     const baseId = $(this).attr('id');
  //     $(`#${baseId}-description`).slideToggle();
  //   });
  // }

  function acceptForm(response) {
    response.data.forEach(function(condition) {
      $('#conditions').append(`<option value="${condition.uid}">${condition.name}<option>`);
    });
    $('#query-form').submit(function(event) {
      event.preventDefault();
      const userQuery = $('#conditions option:selected').attr('value');
      let doctors = [];
      const meta = new Meta({query: userQuery});

      const response = getResponse(meta);
      if(!response) {
        $('#error-message').text('no response');
      } else if (response.meta.error) {
        $('#error-message').text(response.meta.message);
      } else {
        response.data.forEach(function(doctorSnippet) {
          doctors.push(new Doctor(doctorSnippet));
        });
        displayDoctors(doctors);
      }
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
