import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getResponse } from './get-response.js';
import { Doctor } from './doctor.js';
import { Meta } from './meta.js';
import { addStates, getMeta, addDoctors } from './build-site.js';

$(document).ready(function() {
  function failCall(response) {
    let errorMessage = 'API call failed';
    if(response.responseJSON){
      errorMessage = response.responseJSON.meta.message;
    }
    $('#error-message').text(errorMessage);
  }

  let meta = new Meta({}, 'https://api.betterdoctor.com/2016-03-01/conditions?');
  addStates();

  getResponse(meta, acceptForm, failCall);

  function acceptForm(response) {
    if (response.meta.error) {
      $('#error-message').text(response.meta.message);
    } else {
      response.data.forEach(function(condition) {
        $('#conditions').append(`<option value="${condition.uid}">${condition.name}<option>`);
      });
      $('#query-form').submit(function(event) {
        event.preventDefault();
        const meta = getMeta();
        getResponse(meta, displayDoctors, failCall);
      });
    }
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
      addDoctors(doctorList);
      doctorListInteractions();
    }
  }

  function doctorListInteractions() {
    $('dt').on('click', function(event) {
      event.preventDefault();
      const doctorID = $(this).attr('id');
      $(`#${doctorID}-info`).slideToggle();
    });
  }

});
