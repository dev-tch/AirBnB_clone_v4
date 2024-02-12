$(document).ready(function () {
  const checkedAmenities = {};
  function updateCheckboxes () {
    $('input[type="checkbox"]').each(function () {
      const amenId = $(this).attr('data-id');
      if (amenId in checkedAmenities) {
        $(this).prop('checked', true);
      } else {
        $(this).prop('checked', false);
      }
    });
  }
  function updateAmenitiesList () {
    const h4Content = Object.values(checkedAmenities).join(', ');
    $('div.amenities h4').text(h4Content);
  }

  $('input[type="checkbox"]').click(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }
    updateCheckboxes();
    updateAmenitiesList();
  });
  updateCheckboxes();
  updateAmenitiesList();
  console.log('im her');
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response, textStatus) {
    if (textStatus === 'success') {
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    dataType: 'json',
    data: '{}',
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
      for (let i = 0; i < places.length; i++) {
        $('.places').append(`<article>
<div class="title_box">
<h2>${places[i].name}</h2>
<div class="price_by_night">$${places[i].price_by_night}</div>
</div>
<div class="information">
<div class="max_guest">${places[i].max_guest}
${places[i].max_guest > 1 ? 'Guests' : 'Guest'}</div>
<div class="number_rooms">${places[i].number_rooms}
${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}</div>
<div class="number_bathrooms">${places[i].number_bathrooms}
${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</div>
</div>
<div class="user">
</div>
<div class="description">
${places[i].description}
</div>
</article>
`);
      }
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });
});
