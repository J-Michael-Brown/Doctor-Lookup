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
      const meta = new Meta({query: userQuery});

      getResponse(meta, displayDoctors, failCall);
    });
  }



  function displayDoctors(response) {
    $('#doctors').empty();

    let doctorList = [];

    if (response.meta.error) {
      $('#error-message').text(response.meta.message);
    } else {
      response.data.forEach(function(doctorSnippet) {
        doctorList.push(new Doctor(doctorSnippet));
      });

      $('query-form').hide();
      doctorList.forEach(function(doctor, doctorIndex) {
        $('#doctors').append(`<dt id="${doctorIndex}">${doctor.profile.first_name} ${doctor.profile.middle_name}. ${doctor.profile.last_name}</dt>`);
        $('#doctors').append(`<dd class="extended-bio" id="${doctorIndex}-info"><dd>`);

        $(`#${doctorIndex}-info`).append('<h5 class="locations-tag">Locations</h5>');
        $(`#${doctorIndex}-info`).append(`<ul id="${doctorIndex}-locations">`);
        doctor.practices.forEach(function(practice) {
          if (practice.website) {
            $(`#${doctorIndex}-locations`).append(`<li><a href="${practice.website}">${practice.visit_address.city} ${practice.visit_address.state}, ${practice.visit_address.street}</a></li>`);
          } else {
            $(`#${doctorIndex}-locations`).append(`<li>${practice.visit_address.city} ${practice.visit_address.state}, ${practice.visit_address.street}</li>`);
          }
        });
        $(`#${doctorIndex}`).append('</ul>');

        $(`#${doctorIndex}-info`).append(`<p>${doctor.profile.bio}</p>`);
      });

      $('dt').on('click', function(event) {
        event.preventDefault();
        const doctorID = $(this).attr('id');
        $(`#${doctorID}-info`).slideToggle();
      });
    }
  }

});
