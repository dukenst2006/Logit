<div id="viewWorkout">

	<div class="card">
	    <div class="card-content clearfix">
			<h4 class="modal-title pull-left">View/Edit your workout</h4>
			<div class="pull-right">
				<a href="workout/recap/{{ $workoutId }}" type="button" class="btn btn-primary">View Recap</a>
				<button type="button" class="btn btn-danger workout-back">Back</button>
			</div>
	    </div>
	</div>
	<input id="workout_id" type="hidden" value="{{ $workoutId }}">

	@for ($i = 0; $i < count($workout); $i++)
	    @if ($i == 0 || $workout[$i]['exercise_name'] != $workout[$i - 1]['exercise_name'])
	    	<div class="card m-t-10 m-b-10">
		      	<div class="card-content">
			        <h4>{{ $workout[$i]['exercise_name'] }}</h4>
			     	<div class="row">
				     	<div class="col-sm-1 col-xs-2">
				     		<b>Set nr</b>
				     	</div>
				     	<div class="col-sm-3 col-xs-2">
				     		<b>Reps</b>
				     	</div>
				     	<div class="col-sm-4 col-xs-3">
				     		<b>Weight type</b>
				     	</div>
				     	<div class="col-sm-3 col-xs-3">
				     		<b>Value</b>
				     	</div>
				     	<div class="col-sm-1 col-xs-2">
				     		<span class="pull-right">
				     			<b>Save</b>
				     		</span>
			     		</div>
	    			</div>
	  	@endif
		<div class="row">
			<input type="hidden" name="workout_junction_id" value="{{ $workout[$i]['id'] }}">
	     	<div class="col-sm-1 col-xs-2 lh-48 set_nr">
	     		{{ $workout[$i]['set_nr'] }}
     		</div>

	     	<div class="col-sm-3 col-xs-2">
	     		<div class="form-group m-t-0">
	     			<input class="form-control reps" type="number" name="reps" value="{{ $workout[$i]['reps'] }}">
	     		</div>
	     	</div>
	     	
	     	<div class="col-sm-4 col-xs-3">
	     		<div class="form-group m-t-0">
					<select id="weight_type" name="weight_type" class="selectpicker weight_type" 
							data-style="select-with-transition" title="Choose weight type" data-size="8">
						<option @if ($workout[$i]['weight_type'] === "raw") selected @endif value="raw">Raw Weight</option>
						<option @if ($workout[$i]['weight_type'] === "assisted") selected @endif value="assisted">Assisted Weight</option>
						<option @if ($workout[$i]['weight_type'] === "band") selected @endif value="band">Resistance Band</option>
					</select>
     			</div>
	     	</div>

	     	<div class="col-sm-3 col-xs-3">
	     		<div class="form-group m-t-0">
	     			@if ($workout[$i]['weight_type'] === "band")
	     				<select name="band_type" class="selectpicker band_type" 
										data-style="select-with-transition" title="Choose weight type" data-size="8">
							<option @if ($workout[$i]['band_type'] === "black") selected @endif value="black">Black</option>
							<option @if ($workout[$i]['band_type'] === "blue") selected @endif value="blue">Blue</option>
							<option @if ($workout[$i]['band_type'] === "green") selected @endif value="green">Green</option>
							<option @if ($workout[$i]['band_type'] === "red") selected @endif value="red">Red</option>
							<option @if ($workout[$i]['band_type'] === "yellow") selected @endif value="yellow">Yellow</option>
						</select>
	     			@else
	     				<input class="form-control weight" type="number" step="any" name="weight" value="{{ $workout[$i]['weight'] }}">
	     			@endif
     			</div>
	     	</div>

	     	<div class="col-sm-1 col-xs-2">
     			<a class="pull-right pointer updateWorkoutRow"><i class="material-icons material-icons-lg">save</i></a>
	     	</div>
		</div>

  		@if ($i + 1 == count($workout) || ($i + 1 < count($workout) && $workout[$i]['exercise_name'] != $workout[$i + 1]['exercise_name']))
  				</div> <!-- .card-content -->
		    </div> <!-- .card -->
	    @else
			<hr class="m-t-10 m-b-10">
		@endif
	@endfor

	<div class="card">
	    <div class="card-content clearfix">
    		<a href="workout/recap/{{ $workoutId }}" type="button" class="btn btn-primary">View Recap</a>
	  		<button type="button" class="btn btn-danger workout-back pull-right">Back</button>
		</div>
	</div>
</div>