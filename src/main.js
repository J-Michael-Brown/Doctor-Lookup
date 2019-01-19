import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { doctors } from './database-search.js';

$(document).ready(function() {
  let specialties = [];
  // $.ajax({
  //   url: 'https://api.betterdoctor.com/2016-03-01/specialties?',
  //   type: 'GET',
  //   data: {
  //     user_key: process.env.exports.apiKey
  //   },
  //   success: function(response) {
  //     specialties = response.data;
  //     console.log('success');
  //     let idNumber = 0;
  //     specialties.forEach(function(specialty) {
  //       $('#specialty-list').append('<div class="panel">');
  //       $('#specialty-list').append(' <div class="panel-heading">');
  //       $('#specialty-list').append(`  <dt class="specialty-title header" id="${idNumber}">${specialty.name}</dt>`);
  //       $('#specialty-list').append(' </div>');
  //       $('#specialty-list').append(' <div class="panel-body">');
  //       $('#specialty-list').append(`  <dd id="${idNumber}-description">${specialty.description}</dd>`);
  //       $('#specialty-list').append(' </div>');
  //       $('#specialty-list').append('</div>');
  //     });
  //     expandSpecialty();
  //   },
  //   error: function() {
  //     console.log('no dice');
  //   }
  // });

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
      console.log('no dice');
    }
  });

  function expandSpecialty() {
    $('.specialty-title').on('click', function(event) {
      event.preventDefault();
      const baseId = $(this).attr('id');
      $(`#${baseId}-description`).slideToggle();
    });
  }

  function acceptFormSubmission() {
    $('#query-form').submit(function(event) {
      event.preventDefault();
      const query = $('#conditions selected:true').attr('value');
      const searchMetainfo = new Meta(query);
      doctors = new DoctorList(searchMetainfo);
    });

  }

});
