var colors = [];
colors.push('#FF0');
colors.push('#FA0')
colors.push('#F0F');
colors.push('#A0F');
colors.push('#0FF');
colors.push("#0AF");
colors.push('#0FA');
colors.push('#F00');
colors.push('#0F0');

$(document).ready(function() {
  var i = 0;
  $('div').each(function(index, element) {
    if(i == colors.length) {
      i = 0;
    }
    $(element).css('background-color', colors[i++]);
  });
});

