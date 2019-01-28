import $ from 'jquery';

function getResponse(meta, execute, error) {
  let apiResponse;
  $.ajax({
    url: meta.url,
    type: 'GET',
    data: meta.data,
    success: function(response) {
      execute(response);
    },
    error: function(response) {
      error(response);
    }
  });
  return apiResponse;
}


export { getResponse };
