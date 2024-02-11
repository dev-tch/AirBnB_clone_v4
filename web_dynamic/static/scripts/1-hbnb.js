$(document).ready(function() {
    const checkedAmenities = {};
    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            checkedAmenities[amenityId] = amenityName;
        } else {
             delete checkedAmenities[amenityId];
        }
        const amenitiesList = Object.values(checkedAmenities).join(', ');
        $('div.amenities').text(amenitiesList)
    });
});
