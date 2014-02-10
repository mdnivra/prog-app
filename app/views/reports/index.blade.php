@extends('layouts.common')   
      
@section('scripts')  

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
{{ HTML::script('js/libs/require/require.js',array('data-main' => 'js/main')) }}

@stop
    