$(document).ready(function () {
  $('.main-content').css('background-color', getRandomColor());
  $('.sidenav').sidenav();
  $('.modal').modal();
  $(".dropdown-content>li>a").css("color", "#311b92");
  M.AutoInit();
  $(".toggle-password").click(function () {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
  $('#alert_close').click(function () {
    $("#alert_box").fadeOut("slow", function () {
    });
  });
  $('.select-field').html('');
});
$(document).on("click", "#selectUsers", function () {
  $(".openup").toggleClass("open");
});

//Add new question row
$(document).on("click", "#addNew", function (e) {
  e.preventDefault();
  var $body = $("#testBody");
  var $lastRow = $body.find(".qRow:last");
  var $newRow = $lastRow.clone();
  $newRow.find(".qField:last").html('<a href="#" id="remove" class="btn btn-flat btn-small waves-effect red darken-2 waves-light text-white">Fshi Pyetjen</a>');
  $newRow.find('.textInput').val("");
  $newRow.find(".select-field").html('<select required aria-required="true" class="answerSelector" name="answerType"><option value="1" selected>Përgjigje e shkurtë</option><option value="2">Paragraf</option><hr /><option value="3">Zgjidhje të shumëfishtë </option></select><label>Lloji i përgjigjes</label>');
  $newRow.find('.answerSample').hide();
  $newRow.find('.type1').show();
  $lastRow.after($newRow);
  $('select').formSelect();
  // Re-assign Validation
  var form = $("form")
    .removeData("validator")
    .removeData("unobtrusiveValidation");
});

//change answer sample
$(document).on("change", ".answerSelector", function (e) {
  e.preventDefault();
  $(this).closest('.col-sm-10').find('.answerSample').hide();
  $(this).closest('.col-sm-10').find('.type' + $(this).val()).show();
}).val("1");

//Add new option to Option List
$(document).on("click", ".addOption", function (e) {
  e.preventDefault();
  var $optList = $(this).closest(".optList");
  var $lastOpt = $optList.find(".option:last");
  var $newOpt = $lastOpt.clone();

  $newOpt.find(".deleteOpt").html('<button class="close-icon"><span class="material-icons close" style="display:inline-block;top:0;">close</span></button>')

  $lastOpt.after($newOpt);
})

//remove Option from answer type3 Option List
$(document).on("click", ".deleteOpt", function (e) {
  $(this).closest(".option").remove();
});

//remove whole row of question
$(document).on("click", "#remove", function (e) {
  e.preventDefault();
  $(this).closest("#qRow").remove();
});

//reset all questions
$(document).on("click", "#reset", function (e) {
  e.preventDefault();
  if (window.confirm("A jeni të sigurtë për të fshirë të gjitha pyetjet?")) {
    $(".qRow").slice(1).remove();
    $(".qRow").find(".textInput").val("");
    $(".qRow").find(".removebtn").remove();
    $(".select-field select").val("1");
    $('.answerSample').hide();
    $('.type' + $('.select-field select').val()).show();
  }

});



function getRandomColor() {
  var letters = 'BCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}