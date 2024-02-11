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
});
