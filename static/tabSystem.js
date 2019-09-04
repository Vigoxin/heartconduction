$('.tab').on('click', function() {
  var idx =  $('.tab').index($(this));
  tabResponse(idx);
})

function tabResponse(idx) {
  $('.panel').css('backgroundColor', '').css('display', 'none');
  $('.tab').css('backgroundColor', '')
  
  $('.panel').eq(idx).css('display', 'flex');
  $('.panel').eq(idx).css('transition', 'all 0.3s ease-out');
  $('.tab').eq(idx).css('backgroundColor', $('.panel').eq(idx).css('backgroundColor'))
}

tabResponse(0);