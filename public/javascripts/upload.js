var crop = function(image) {
  image.Jcrop({
    aspectRatio: 1,
    setSelect: [0, 0, 600, 600],
    onSelect: showPreview,
    onChange: showPreview
  });
};

var showPreview = function(c,image) {
  var canvas = document.createElement("canvas"); 
  var ctx = canvas.getContext("2d");
  canvas.width = 72;
  canvas.height = 72;
  var img = document.getElementById("original"); 
  ctx.drawImage(img, c.x, c.y, c.w, c.h, 0, 0, 72, 72);
  var result = canvas.toDataURL("image/png");
  $('#preview').attr("src", result);
  $('input[name=avatar]').remove();
  $('#upload-avatar').append('<input name="avatar" type="hidden" value="'+result+'" />');
};

var renderImage = function(file, place) {
  var img = document.createElement("img");

  if (file.type.match(/image.*/) && file.size < 50000000) {
    var reader = new FileReader();
    reader.onload = function(e) { 
      console.log(e);
      img.src = e.target.result;
      var newImg = resizeImage(img);
      place.attr("src", newImg);
      crop(place);
    };
    reader.readAsDataURL(file);
  }
};

var resizeImage = function(img) {
  var MAX_WIDTH = 600;
  var MAX_HEIGHT = 600;
  var width = img.width;
  var height = img.height;

  var canvas = document.createElement("canvas"); 
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  if (width > height) {
    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width;
      width = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height;
      height = MAX_HEIGHT;
    }
  }
  canvas.width = width;
  canvas.height = height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/png");
}

$(document).ready(function() {
  var input = document.getElementsByName("avatar");
  var placeToRender = $("img#original");
  $(input).change(function(){
    var file = this.files[0];
    renderImage(file, placeToRender);
  });
});
