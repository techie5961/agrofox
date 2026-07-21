@extends('layout.users.app')
@section('title')
    Update Password
@endsection
@section('css')
   <style class="css">
        main{
            padding:0;
        }
    </style>
@endsection
@section('main')
     <section class="w-full column">
         <section class="column w-full g-10px">
            <div class="row bg-primary p-20px pc-x-padding primary-text w-full g-10 align-center space-between">
               <i onclick="Redirect('{{ url()->previous() }}')" class="h-40px w-40px no-shrink no-select pointer circle bg-secondary secondary-text column align-center justify-center box-shadow">

                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                </i>
                <span class="font-weight-900 block font-1">Update Password</span>
                <span>
                </span>
           
            </div>
          
        </section>
        {{-- new section /body --}}
        <section class="section p-20px body">
            <form action="{{ url('users/post/update/password/process') }}" onsubmit="PostRequest(event,this,Updated)" class="analytics max-w-500 m-x-auto column bg-light w-full p-20px br-10px box-shadow g-10">
               {{-- csrf token --}}
               <input type="hidden" class="input inp required" name="_token" value="{{ @csrf_token() }}">
                {{-- new input --}}
                <div class="column g-5 w-full">
                 <label>Current Password</label>
                <div class="cont">
                    <input name="current" placeholder="Enter current account password"  autocomplete="new-password" readonly onfocus="this.removeAttribute('readonly')" type="password" class="inp input required">
                </div>
               </div>
                {{-- new input --}}
                <div class="column g-5 w-full">
                 <label>New Password</label>
               <div class="cont">
                    <input name="new" placeholder="Enter new account password" type="password" autocomplete="new-password" readonly onfocus="this.removeAttribute('readonly')" class="inp input required">
                </div>
               </div>
               {{-- new input --}}
                <div class="column g-5 w-full">
                 <label>Confirm New Password</label>
               <div class="cont">
                    <input name="confirm" placeholder="Re-Type new account password" type="password" autocomplete="new-password" readonly onfocus="this.removeAttribute('readonly')" class="inp input required">
                </div>
               </div>
              
             <button class="post">Update Password</button>
            </form>
        

            
        </section>
    </section>

    
@endsection
@section('js')
    <script class="js">
        function Updated(response){
            let data=JSON.parse(response);
            if(data.status == 'success'){
                Redirect('{{ url()->current() }}');
            }
        }
    </script>
@endsection