@extends('layouts.app')

@section('content')
  @include('notifications')
  <div id="viewRoutine" class="card-content">
  </div>
  
  <div id="routines">
    <div class="card">
      <div class="card-header card-header-icon" data-background-color="green">
        <i class="material-icons">accessibility</i>
      </div>
      <div class="card-content">
        <h4 class="card-title">My Routines</h4>
        <div class="toolbar"></div>
        <div class="material-datatables">
          <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
            <thead>
              <tr>
                <th>Routine Name</th>
                <th>Last used</th>
                <th>Times used</th> 
                <th>Created at</th>
                <th class="text-center disabled-sorting">Delete</th>
                <th class="text-center disabled-sorting">View/Edit</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Routine Name</th>
                <th>Last used</th>
                <th>Times used</th> 
                <th>Created at</th>
                <th class="text-center">Delete</th>
                <th class="text-center">View/Edit</th>
              </tr>
            </tfoot>
            <tbody>
              @foreach ($routines as $routine)
                <tr id="routine-{{ $routine->id }}">
                  <td class="routine-name">
                    @if ($routine->active == 0)
                      <span class="fa fa-lock"></span> {{ $routine->routine_name }} (Inactive)
                    @else
                      {{ $routine->routine_name }}
                    @endif
                  </td> 
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>{{ $routine->created_at }}</td>
                  <td class="text-center">
                    <a class="pointer deleteRoutine" id="{{ $routine->id }}">
                      <span class="fa fa-trash-o fa-lg danger-color"></span>
                    </a>
                  </td>
                  <td class="text-center">
                    <a class="viewRoutine pointer" data-toggle="modal" data-target="#viewRoutineModal">
                      <input type="hidden" value="{{ $routine->id }}">
                      <span class="fa fa-pencil fa-lg success-color"></span>
                    </a>
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <a class="btn btn-primary" href="my_routines/add_routine" role="button"><span class="fa fa-plus"></span> Add a routine</a>
  </div>
@endsection

@section('script')
  <script src="/js/routines.js"></script>
@endsection

