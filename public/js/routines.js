$(function() {
  $("#sortable")
    .sortable({
      handle: '.handle',
      cursor: 'move',
      cancel: ''
    })
    .disableSelection();
});

$(document).on('click', '.viewRoutine', function() {
  var routineId = $(this).children('input').val();

  $.ajax({
    url: '/dashboard/my_routines/view/' + routineId,
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    method: 'GET',
    success: function(data) {
      $("#routines").hide();
      $("#viewRoutine").html(data['data']).show();
      $("#sortable")
      .sortable({
        handle: '.handle',
        cursor: 'move',
        cancel: ''
      })
      .disableSelection();
    },
  })
});

$(document).on('click', '.routine-back', function() {
  $("#viewRoutine").empty().hide();
  $("#routines").show();

  $(".ps-container").scrollTop(0);
  $(".ps-container").perfectScrollbar('update');
});

/* Functions for deleting a routing */
$(document).on('click', '.deleteRoutine', function() {
  var routineId = $(this).attr('id');
  var name = $("#routine-" + routineId).find('.routine-name').html().trim();

  swal({
    title: 'Are you sure?',
    text: name + " will be gone forever!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(function () {
    swal(
      'Deleted!',
      'Your routine has been deleted.',
      'success'
    )
    deleteRoutine(routineId);
  })
});

var deleteRoutine = function(routineId) {
  $.ajax({
    url: '/dashboard/my_routines/delete/' + routineId,
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    method: 'GET',
    success: function(data) {
      $("#routine-" + routineId).fadeOut();
      $("tr.child").fadeOut();
    },
  });
}

/* Functions for removing/adding exerciserows */
$(document).on('click', '#addMore', function() {
  var currentExerciseNr = parseInt($("#exerciseNr").val());
  var exerciseNr = currentExerciseNr + 1;

  var formData = '<div class="thisExercise">' +
    '<div class="card m-t-10 m-b-10">' +
      '<div class="card-content">' +
        '<div class="sortable-content">' +
          '<div class="sort-icon handle">' +
              'Drag me to sort ' +
            '<span class="fa fa-arrows-v"></span>' +
            '<a class="deleteExercise btn btn-sm btn-danger pull-right"><span class="fa fa-trash"></span></a>' +
          '</div>' +
          '<div class="form-group label-floating">' +
            '<label class="control-label" for="exercise_name">Excersice name</label>' +
            '<input type="text" class="required form-control exercise_name" id="exercise_name" name="exercises[' + exerciseNr + '][exercise_name]">' +
          '</div>' +
          '<div class="form-group">' +
            '<select id="muscle_group" name="exercises[' + exerciseNr + '][muscle_group]" class="selectpicker" data-style="select-with-transition" title="Choose a muscle group" data-size="8">' +
              '<option selected disabled>Select a muscle group</option>' +
              '<option value="back">Back</option>' +
              '<option value="biceps">Biceps</option>' +
              '<option value="triceps">Triceps</option>' +
              '<option value="abs">Abs</option>' +
              '<option value="shoulders">Shoulders</option>' +
              '<option value="legs">Legs</option>' +
              '<option value="chest">Chest</option>' +
            '</select>' +
          '</div>' +
          '<div class="row">' +
            '<div class="col-md-4">' +
              '<div class="form-group label-floating">' +
                '<label class="control-label" for="goal_weight">Weight goal</label>' +
                '<input type="number" step="any" class="required form-control" id="goal_weight" name="exercises[' + exerciseNr + '][goal_weight]">' +
              '</div>' +
            '</div>' +
            '<div class="col-md-4">' +
              '<div class="form-group label-floating">' +
                '<label class="control-label" for="goal_sets">Sets goal</label>' +
                '<input type="number" class="required form-control" id="goal_sets" name="exercises[' + exerciseNr + '][goal_sets]">' +
              '</div>' +
            '</div>' +
            '<div class="col-md-4">' +
              '<div class="form-group label-floating">' +
                '<label class="control-label" for="goal_reps">Reps goal</label>' +
                '<input type="number" class="required form-control" id="goal_reps" name="exercises[' + exerciseNr + '][goal_reps]">' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
  $("#exerciseNr").val(exerciseNr);
	$("#sortable").append(formData);
  $('.selectpicker').selectpicker({});
});

$(document).on('click', '.deleteExercise', function() {
  $(this).closest('.thisExercise').fadeOut(function() {
    $(this).empty();
  });
});

$(document).on('click', '#addRoutine', function() {
  var ok = true
  $(".required").each(function() {
    if ($(this).val() == "" || $(this).val() == null) {
      $(this).closest(".form-group").addClass("has-error").find(".control-label").removeClass("hidden")
      ok = false
    } else {
      $(this).closest(".form-group").removeClass("has-error").find(".control-label").addClass("hidden")
    }
  })

  var names = [];
  var dupes = [];
  var namesOk = false;
  $(".exercise_name").each(function() {
    names.push($(this).val())
  })
  names.sort()
  for (var i = 0; i < names.length - 1; i++) {
    if (names[i + 1] == names[i]) {
      dupes.push(names[i]);
      namesOk = true;
      ok = false;
    }
  }

  if (namesOk) {
    $("#alert-field").html('<div class="alert alert-danger">' +
        '<strong>Whops!</strong> Some of your exercises shares the same name (' + dupes[0] + '). This might cause issues. Append something to your duplicate exercisenames and try again.' +
      '</div>')
  } else {
    $("#alert-field").empty();
  }

  return ok
})

$(document).on('click', '#changeStatus', function() {
  var routineId = $("#routineId").val();
  var status = $("#status").val();

  $.ajax({
    url: '/dashboard/my_routines/edit/status/' + routineId,
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    method: 'POST',
    data: {
      'routineId': routineId,
      'status': status,
    },
    success: function(data) {
      console.log(data.success);

      if (data.success) {
        location.reload();
      } else {
        $("#changeStatus").removeClass("btn-default").addClass("btn-danger").text("Refresh page and try again!")
      }
    },
    error: function() {
      $("#changeStatus").removeClass("btn-default").addClass("btn-danger").text("Refresh page and try again!")
    }
  })
})

$(document).ready(function() {
  $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
          search: "_INPUT_",
          searchPlaceholder: "Search records",
      }

  });


  var table = $('#datatables').DataTable();
})