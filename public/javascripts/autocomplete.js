$(function() {
  var searchBox = $("#user_search_box")
  var autocompleteBox = $("#user_autocomplete_box");
  
  searchBox.keyup(function (event) {
      var li = autocompleteBox.find("li").first();
      var liSelected = $(".selected");

    if(event.which === 40) {
      navDown(li, liSelected);
      return;
    }

    if(event.which === 38) {
      navUp(li, liSelected);
      return;
    }

    if(event.which === 13 && liSelected.length > 0) {
      window.location = "/" + liSelected.data("username");
    }


    if(searchBox[0].value.length == 0) {
      autocompleteBox.hide();
    } else if(autocompleteBox.is(":visible") == false) {
      autocompleteBox.show();
    } 

    var val = searchBox.val();

    if (val) {
        autocompleteBox.html("");
        $.get('/search/' + val, function (data) {
          for(var i = 0; i < data.length; i = i+2) {
            autocompleteBox.append("<li data-username=" + data[i+1] + " class=\"clickable\">" + data[i] + "</li>");
          }

          $(".clickable").click(function() {
            window.location = "/" + this.getAttribute("data-username");
          });

        }); // end AJAX get
      } // end if(val)
  });
});

function navDown(li, liSelected) {
  if(liSelected){
    liSelected.removeClass('selected');
    next = liSelected.next();

    if(next.length > 0) {
      liSelected = next.addClass('selected');
    } else {
      liSelected = li.eq(0).addClass('selected');
    }
  } else {
    liSelected = li.eq(0).addClass('selected');
  }
}

function navUp(li, liSelected) {
  if(liSelected){
    liSelected.removeClass('selected');
    next = liSelected.prev();

    if(next.length > 0){
      liSelected = next.addClass('selected');
    } else {
      liSelected = li.last().addClass('selected');
    }
  } else {
    liSelected = li.last().addClass('selected');
  }
}