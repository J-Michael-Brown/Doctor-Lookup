import $ from 'jquery';

function getResponse(meta, execute, error) {
  let apiResponse;
  $.ajax({
    url: meta.url,
    type: 'GET',
    data: meta.data,
    success: function(response) {
      console.log('API call successful');
      execute(response);
    },
    error: function() {
      error();
    }
  });
  return apiResponse;
}


export { getResponse };
