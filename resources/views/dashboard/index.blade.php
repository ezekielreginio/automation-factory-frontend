@extends('layouts.component')

@section('content')
    <test-case-component></test-case-component>
@endsection

@section('scripts')
    <script src="{{ mix('js/components/test_case.min.js') }}" defer></script>
@endsection