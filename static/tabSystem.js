$('.my-tab').on('click', function() {
  var idx =  $('.my-tab').index($(this));
  tabResponse(idx);
})

function tabResponse(idx) {
  $('.panel').css('backgroundColor', '').css('display', 'none');
  $('.my-tab').css('backgroundColor', '');
  
  $('.panel').eq(idx).css('display', 'block');
  $('.panel').eq(idx).css('transition', 'all 0.3s ease-out');
  $('.my-tab').eq(idx).css('backgroundColor', $('.panel').eq(idx).css('backgroundColor'))
}

tabResponse(0);