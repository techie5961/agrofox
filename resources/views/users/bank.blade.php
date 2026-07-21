@extends('layout.users.app')
@section('title')
    Bank Details
@endsection
@section('css')
    <style class="css">
        .main-body.active{
            transform: scale(0.95) translateY(10px);
        }
    </style>
@endsection
@section('main')
     <section x-data="{ 
        Bankselected : false,
        BankOverlay : false,
        Bank : {
            Code : '',
            Name : ''
        }
      }" x-init="
      $watch('BankOverlay', (value) => {
        if(value){
            document.body.classList.add('overflow-hidden');
        }else{
            document.body.classList.remove('overflow-hidden');
        }
      })
      " class="w-full g-10px column">
      <section x-bind:class="BankOverlay ? 'active' : ''" class="w-full main-body transition-all column g-10px">
         <section class="column w-full g-10px">
            <div class="row w-full g-10 align-center space-between">
               <i onclick="Redirect('{{ url()->previous() }}')" class="h-40px w-40px no-shrink no-select pointer circle bg-secondary secondary-text column align-center justify-center box-shadow">

                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                </i>
                <span class="font-weight-900 block font-1">Bank Details</span>
                <span>

                </span>
           
            </div>
          @isset(Auth::guard('users')->user()->bank)

            <div class="w-full column g-5px border-bottom-width-2px border-bottom-style-solid border-bottom-color-primary-light box-shadow bg-primary primary-text max-w-500 m-x-auto br-10 p-20 column g-10">
                <strong class="font-weight-800">Current Bank Account</strong>
               <span class="uppercase">{{ json_decode(Auth::guard('users')->user()->bank)->account_name }}</span>
               <span class="opacity-07">{{ json_decode(Auth::guard('users')->user()->bank)->bank_name }} <br> ....{{ substr(json_decode(Auth::guard('users')->user()->bank)->account_number,6,4) }}</span>
           
            </div>
            @endisset
        </section>
        {{-- new section /body --}}
        <section class="section column w-full g-10px body">
            <form method="POST" action="{{ url('users/post/add/bank/process') }}" x-on:submit="PostRequest(event,$el,function(response){
                let data=JSON.parse(response);
                if(data.status == 'success'){
                    Vitecss.navigate('{{ url()->current() }}');
                
                }
            })" class="analytics p-20px w-full br-10px max-w-500 m-x-auto bg-light column g-10">
               {{-- csrf token --}}
               <input type="hidden" class="input inp required" name="_token" value="{{ @csrf_token() }}">
                {{-- new input --}}
                <div class="column g-5 w-full">
                 <label>Account Number</label>
                <div class="cont">
                    <input name="account_number" placeholder="Enter 10-digits account number" inputmode="numeric" type="number" class="inp input required">
                </div>
               </div>
                {{-- new input --}}
                <div class="column g-5 w-full">
                 <label>Bank Name</label>
                <div x-on:click="
                BankOverlay = true;
                " class="no-select bank-cont pc-pointer cont">
                <input type="hidden" x-bind:value="Bank.Name" name="bank_name" class="inp input required">
                <input type="hidden" x-bind:value="Bank.Code" name="bank_code" class="inp input required">
                 {{-- new --}}
                 <template x-if="!Bankselected">
                    <div class="row align-center no-select opacity-07 p-10px w-full g-10px space-between">
                        <span>Select bank</span>
                        <i>
                            <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>

                        </i>
                    </div>
                 </template>
                  <template x-if="Bankselected">
                    <div class="row align-center no-select p-10px w-full g-10px space-between">
                        <span x-text="Bank.Name"></span>
                      
                    </div>
                 </template>
                </div>
               </div>
               {{-- new input --}}
                <div class="column g-5 w-full">
                 <label>Account Name</label>
                <div class="cont">
                  <input name="account_name" type="text" placeholder="Enter account name" class="inp input required">
                </div>
               </div>
              
             <button class="post">Update Bank Details</button>
            </form>
          {{-- group --}}
          <section class="group w-full column g-10">
             

              {{-- new div --}}
            <div class="column w-full bg-light br-10 g-10 p-20">
                <strong class="font-1">Instructions</strong>
               
                 {{-- new row --}}
                <div class="row g-5">
                    <i class="c-green">
                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="15" width="15"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>

                    </i>
                    <span>Please ensure the account entered is correct to avoid issues with withdrawal.</span>
                </div>
                  {{-- new row --}}
                <div class="row g-5">
                    <i class="c-green">
                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="15" width="15"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>

                    </i>
                    <span>You can always come back here to update your bank details.</span>
                </div>
                 
                 {{-- new row --}}
                <div class="row g-5">
                    <i class="c-green">
                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="15" width="15"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>

                    </i>
                    <span>If you encounter any difficulties in adding your bank account do well to contact our support team.</span>
                </div>
            </div>
          </section>

            
        </section>
    </section>
    <section x-on:click="
    BankOverlay = false;
    " x-show="BankOverlay" x-transition:enter-start="fade-enter" x-transition:enter-end="fade-enter-end" x-transition:leave-start="fade-leave" x-transition:leave-end="fade-leave-end" class="pos-fixed transition-all overflow-hidden justify-end column align-center backdrop-blur-10px inset-0 z-index-3000 bg-black-transparent">
        {{-- child --}}
        <div x-on:click.stop="" x-show="BankOverlay" x-transition:enter-start="bottom-enter" x-transition:enter-end="bottom-enter-end" x-transition:leave-start="bottom-leave" x-transition:leave-end="bottom-leave-end" class="w-full max-h-half transition-all column bg-light overflow-hidden br-top-left-15px br-top-right-15px">
           {{-- new row --}}
            <div class="w-full pos-sticky bg-inherit p-20px row align-center space-between">
                <strong class="font-size-1 font-weight-800">Select bank</strong>
                <div x-on:click="
    BankOverlay = false;
    " class="h-30px w-30px circle bg-rgt-005 perfect-square no-shrink column align-center justify-center">
                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>

                </div>
            </div>
            {{-- bank loop --}}
          <div class="w-full overflow-auto column">
              @foreach (collect(json_decode(file_get_contents(database_path('data/nekpayBanks.json'))))->sortBy('name') as $data)
                <div x-on:click="
                Bank.Code = '{{ $data->code }}';
                Bank.Name = '{{ $data->name }}';
                Bankselected = true;
                BankOverlay=false;
                " class="w-full row align-center p-x-20px p-10px">
                    <span>{{ $data->name }}</span>
                </div>
            @endforeach
          </div>
        </div>
    </section>
</section>
@endsection
