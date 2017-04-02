var $allNavLinks = $('.navbar-nav .nav-link');

$(document).ready(function() {
  $(document).on('scroll', handleScroll);
  
  $(document).on('click', '.scroll', function(e) {
    e.preventDefault();
    smoothScroll($(e.currentTarget).attr('href'), 50);
  });
  
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {    
    var target = $(this).attr('href');
    $('a[data-toggle="tab"]').removeClass('active');
    $('a[href="' + target + '"]').addClass('active');
  });
});

function handleScroll() {
  var position = $(window).scrollTop();
  $allNavLinks.removeClass('active');
  if (position >= $('#services').position().top && position < $('#products').position().top) {
    $('.nav-link[href="#services"]').addClass('active');
    var relativePos = position - $('#services').position().top;
    if (relativePos >= $('#exporter').position().top && relativePos < $('#projects').position().top) {
      $('#services').css('background-color', '#57d781');
    } else if (relativePos >= $('#projects').position().top) {
      $('#services').css('background-color', '#fba6c9');
    } else {
      $('#services').css('background-color', '#25adff');
    }
  } else if (position >= $('#products').position().top && position < $('#about').position().top) {
    $('.nav-link[href="#products"]').addClass('active');
  } else if (position >= $('#about').position().top && position < $('#contact').position().top) {
    $('.nav-link[href="#about"]').addClass('active');
  } else if (position >= $('#contact').position().top) {
    $('.nav-link[href="#contact"]').addClass('active');
  }
}

function smoothScroll(anchor, offset) {
  $('body').animate({scrollTop: $(anchor).offset().top - offset }, 'slow');
}
