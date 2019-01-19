import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { DoctorList } from './doctor-list.js';
// import { Meta } from './meta.js';

$(document).ready(function() {
  // $.ajax({
  //   url: 'https://api.betterdoctor.com/2016-03-01/conditions?',
  //   type: 'GET',
  //   data: {
  //     user_key: process.env.exports.apiKey
  //   },
  //   success: function(response) {
  //     response.data.forEach(function(condition) {
  //       $('#conditions').append(`<option value="${condition.uid}">${condition.name}<option>`);
  //     });
  //     acceptFormSubmission();
  //   },
  //   error: function() {
  //
  //   }
  // });
  //
  // function expandSpecialty() {
  //   $('.specialty-title').on('click', function(event) {
  //     event.preventDefault();
  //     const baseId = $(this).attr('id');
  //     $(`#${baseId}-description`).slideToggle();
  //   });
  // }
  //
  // function acceptFormSubmission() {
  //   $('#query-form').submit(function(event) {
  //     event.preventDefault();
  //     const query = $('#conditions selected:true').attr('value');
  //     const searchMetainfo = new Meta(query);
  //     let doctors = new DoctorList(searchMetainfo);
  //   });
  //
  // }

});
