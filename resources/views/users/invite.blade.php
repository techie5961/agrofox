@extends('layout.users.app')
@section('title')
   Invite & Earn
@endsection
@section('css')
    <style class="css">
        main{
            padding:0;
        }
    </style>
@endsection
@section('main')
     <section x-data="{  }" class="w-full column">
        <section class="column w-full g-10px">
            <div class="row bg-primary p-20px pc-x-padding primary-text w-full g-10 align-center space-between">
               <i onclick="Redirect('{{ url()->previous() }}')" class="h-40px w-40px no-shrink no-select pointer circle bg-secondary secondary-text column align-center justify-center box-shadow">

                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                </i>
                <span class="font-weight-900 block font-1">Invite & Earn</span>
                <span x-on:click="Redirect('{{ url('users/referrals') }}')">
<svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M12 10C14.2091 10 16 8.20914 16 6 16 3.79086 14.2091 2 12 2 9.79086 2 8 3.79086 8 6 8 8.20914 9.79086 10 12 10ZM5.5 13C6.88071 13 8 11.8807 8 10.5 8 9.11929 6.88071 8 5.5 8 4.11929 8 3 9.11929 3 10.5 3 11.8807 4.11929 13 5.5 13ZM21 10.5C21 11.8807 19.8807 13 18.5 13 17.1193 13 16 11.8807 16 10.5 16 9.11929 17.1193 8 18.5 8 19.8807 8 21 9.11929 21 10.5ZM12 11C14.7614 11 17 13.2386 17 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5 15.9999C5 15.307 5.10067 14.6376 5.28818 14.0056L5.11864 14.0204C3.36503 14.2104 2 15.6958 2 17.4999V21.9999H5V15.9999ZM22 21.9999V17.4999C22 15.6378 20.5459 14.1153 18.7118 14.0056 18.8993 14.6376 19 15.307 19 15.9999V21.9999H22Z"></path></svg>
                </span>
           
            </div>
          
        </section>
        {{-- new section /body --}}
        <section class="section p-20px w-full column g-10px body">
          <div x-data="{ 
                    Link : '{{ url('register?ref='.Auth::guard('users')->user()->uniqid.'') }}',
                    Code : '{{ Auth::guard('users')->user()->uniqid }}'
                 }"  class="w-full column p-20px br-15px g-10px bg-light box-shadow">
            <strong class="font-size-1 font-weight-800">Your Invite Link</strong>
            {{-- new row --}}
            <div class="row g-10px align-center space-between">
                <div class="h-40px br-10px row align-center p-15px text-overflow-ellipsis ws-nowrap bg-primary-01 c-rgt-07 overflow-hidden">
                    <div class="w-full opacity-07 max-w-full ws-nowrap text-overflow-ellipsis" x-text="Link"></div>
                </div>
                <button x-on:click="copy(Link)" class="btn-primary g-2px ws-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="CurrentColor" height="20" width="20"><path d="M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z"></path></svg>

                    copy
                </button>
            </div>
            {{-- new row --}}
            <div class="row g-5px align-center">
                <small>Invite Code:</small>
                <small x-on:click="copy(Code)" class="c-primary-light font-weight-700" x-text="Code"></small>
            </div>
          </div>
            {{-- content body --}}
            <section class="body column g-10px m-top-10px section">
              
                <strong class="desc font-weight-900">Team Structure</strong>
                {{-- new --}}
                <div class="w-full column g-10px br-15px p-20px bg-light box-shadow">
                    {{-- new row --}}
                    <div class="w-full row align-center g-10px">
                        <div class="h-40px perfect-square no-shrink bg-primary primary-text column align-center justify-center circle font-weight-900 font-size-1">
                            1
                        </div>
                        {{-- new column --}}
                        <div class="column g-5px">
                            <span class="font-weight-700">Direct</span>
                            <div class="p-5px row align-center g-5px p-x-10px font-size-07 font-weight-800 br-10px no-select primary-text bg-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="CurrentColor" height="15" width="15"><path d="M244,56v64a12,12,0,0,1-24,0V85l-75.51,75.52a12,12,0,0,1-17,0L96,129,32.49,192.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0L136,135l67-67H168a12,12,0,0,1,0-24h64A12,12,0,0,1,244,56Z"></path></svg>

                               {{ number_format($referral_settings->level_1) }}% Commission
                            </div>
                        </div>
                    </div>
                </div>
                 {{-- new --}}
                <div class="w-full column g-10px br-15px p-20px bg-light box-shadow">
                    {{-- new row --}}
                    <div class="w-full row align-center g-10px">
                        <div class="h-40px perfect-square no-shrink bg-primary-light primary-text column align-center justify-center circle font-weight-900 font-size-1">
                            2
                        </div>
                        {{-- new column --}}
                        <div class="column g-5px">
                            <span class="font-weight-700">2nd Level</span>
                            <div class="p-5px row align-center g-5px p-x-10px font-size-07 font-weight-800 br-10px no-select primary-text bg-primary-light">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="CurrentColor" height="15" width="15"><path d="M244,56v64a12,12,0,0,1-24,0V85l-75.51,75.52a12,12,0,0,1-17,0L96,129,32.49,192.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0L136,135l67-67H168a12,12,0,0,1,0-24h64A12,12,0,0,1,244,56Z"></path></svg>

                               {{ number_format($referral_settings->level_2) }}% Commission
                            </div>
                        </div>
                    </div>
                </div>
                 {{-- new --}}
                <div class="w-full column g-10px br-15px p-20px bg-light box-shadow">
                    {{-- new row --}}
                    <div class="w-full row align-center g-10px">
                        <div class="h-40px perfect-square no-shrink bg-secondary secondary-text column align-center justify-center circle font-weight-900 font-size-1">
                            3
                        </div>
                        {{-- new column --}}
                        <div class="column g-5px">
                            <span class="font-weight-700">3rd Level</span>
                            <div class="p-5px row align-center g-5px p-x-10px font-size-07 font-weight-800 br-10px no-select secondary-text bg-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="CurrentColor" height="15" width="15"><path d="M244,56v64a12,12,0,0,1-24,0V85l-75.51,75.52a12,12,0,0,1-17,0L96,129,32.49,192.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0L136,135l67-67H168a12,12,0,0,1,0-24h64A12,12,0,0,1,244,56Z"></path></svg>

                               {{ number_format($referral_settings->level_3) }}% Commission
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
        </section>
    </section>

    
@endsection
@section('js')
    <script class="js">
     
    </script>
@endsection