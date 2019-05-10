$(document).ready(function() {
  $(".count").prop("disabled", true);
  $(document).on("click", ".plus", function() {
    $(".count").val(parseInt($(".count").val()) + 1);
  });
  $(document).on("click", ".minus", function() {
    $(".count").val(parseInt($(".count").val()) - 1);
    if ($(".count").val() == 0) {
      $(".count").val(1);
    }
  });
});
