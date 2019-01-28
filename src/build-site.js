import $ from 'jquery';
import { Meta } from './meta.js';

const unitedStates = [
  {name:"Alabama", abreviation: "al"},
  {name:"Alaska", abreviation: "ak"},
  {name:"Arizona", abreviation: "az"},
  {name:"Arkansas", abreviation: "ar"},
  {name:"California", abreviation: "ca"},
  {name:"Colorado", abreviation: "co"},
  {name:"Connecticut", abreviation: "ct"},
  {name:"Florida", abreviation: "fl"},
  {name:"Georgia", abreviation: "ga"},
  {name:"Hawaii", abreviation: "hi"},
  {name:"Idaho", abreviation: "id"},
  {name:"Illinois", abreviation: "il"},
  {name:"Indiana", abreviation: "in"},
  {name:"Iowa", abreviation: "ia"},
  {name:"Kansas", abreviation: "ks"},
  {name:"Kentucky", abreviation: "ky"},
  {name:"Louisiana", abreviation: "la"},
  {name:"Maine", abreviation: "me"},
  {name:"Maryland", abreviation: "md"},
  {name:"Massachusetts", abreviation: "ma"},
  {name:"Michigan", abreviation: "mi"},
  {name:"Minnesota", abreviation: "mn"},
  {name:"Mississippi", abreviation: "ms"},
  {name:"Missouri", abreviation: "mo"},
  {name:"Montana", abreviation: "mt"},
  {name:"Nebraska", abreviation: "ne"},
  {name:"Nevada", abreviation: "nv"},
  {name:"New Hamshire", abreviation: "nh"},
  {name:"New Jersey", abreviation: "nj"},
  {name:"New Mexico", abreviation: "nm"},
  {name:"New York", abreviation: "ny"},
  {name:"North Carolina", abreviation: "nc"},
  {name:"North Dakota", abreviation: "nd"},
  {name:"Ohio", abreviation: "oh"},
  {name:"Oklahoma", abreviation: "ok"},
  {name:"Oregon", abreviation: "or"},
  {name:"Pennsylvania", abreviation: "pa"},
  {name:"Rhode Island", abreviation: "ri"},
  {name:"South Carolina", abreviation: "sc"},
  {name:"South Dakota", abreviation: "sd"},
  {name:"Tennessee", abreviation: "tn"},
  {name:"Texas", abreviation: "tx"},
  {name:"Utah", abreviation: "ut"},
  {name:"Vermont", abreviation: "vt"},
  {name:"Virginia", abreviation: "va"},
  {name:"Washington", abreviation: "wa"},
  {name:"West Virginia", abreviation: "wv"},
  {name:"Wisconsin", abreviation: "wi"},
  {name:"Wyoming", abreviation: "wy"}
];

function addStates() {
  // $('#states').append(`<option>no state<option>`);
  unitedStates.forEach(function(state) {
    $('#states').append(`<option value="${state.abreviation}">${state.name}<option>`);
  });
}

function getMeta() {
  const userQuery = $('#conditions option:selected').attr('value');
  const meta = new Meta({query: userQuery});
  const state = $('#states option:selected').attr('value');
  const city = $('#city').attr('value');
  let locationSlug = false;
  if(state) {
    locationSlug = state;
    if(city) {
      locationSlug+=('-' + city);
    }
  }
  if(locationSlug) {
    meta.data.location = locationSlug;
  }
  return meta;
}

function addDoctors(doctorList) {
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
}

export { addStates, getMeta, addDoctors };
