@extends('layout.users.app')
@section('title')
    Recharge
@endsection
@section('css')
    <style class="css">
            main{
            padding:0;
            }
            section.section{
            padding:20px;
            }
            section.section.title{
            background:var(--primary);
            padding-bottom:70px;
            clip-path:ellipse(100% 100% at top center);
            display:flex;
            flex-direction:column;
            gap:20px;


            }

            section.section.body{
            padding-top:0;
            }
            section.section.body  > form,section.section.body > div{
            width:100%;
            background:var(--bg-light);
            padding:20px;
            border-radius:10px;
            transform:translateY(-50px);


            }


       

        @media(min-width:800px){
            section.section{
                padding-left:10vw;
                padding-right:10vw;
            }
            
        }
    </style>
@endsection
@section('main')
     <section class="w-full column">
        <section class="section title">
            <div class="row w-full g-10 align-center space-between">
               <i onclick="Redirect('{{ url()->previous() }}')" class="row back-icon pointer align-center h-fit">

                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                </i>
                <span class="font-weight-700 block font-1">Recharge</span>
               <span></span>
            </div>
          <div style="border:1px solid var(--primary-text);box-shadow:0 10px 10px rgba(0,0,0,0.1);background:rgba(0,0,0,0.1)" class="w-full max-w-500 m-x-auto br-10 p-20 column g-10">
                <strong class="desc">{{ $currency.number_format(Auth::guard('users')->user()->deposit_balance,2) }}</strong>
                <span>Deposit Balance</span>
            </div>
        </section>
        {{-- new section /body --}}
        <section class="section body">
            @isset(Auth::guard('users')->user()->paga_account)
                
              <div class="analytics bg-light max-w-500 m-x-auto column g-10">
                {{-- new row --}}
                <div class="row w-full g-10 alifgn-center">
                    <img  src="{{ asset('banners/IMG_7936.png') }}" class="bg-white br-5 p-4 h-40">
                    {{-- new column --}}
                    <div class="column g-5">
                    <strong class="font-size-1 font-weight-900">Paga Microfinance Bank</strong>
                    </div>
                </div>
                {{-- new row --}}
                <div style="width:100%;padding:15px !important;height:auto;display:flex;flex-direction:row;align-items:center;gap:10px;justify-content:space-between;" class=" bg-primary-01 border-width-1px border-style-solid border-color-primary-02 w-full align-center space-between br-5px row p-15">
                   <div class="column g-5">
                    <small>Account Number</small>
                    <strong class="font-weight-700 font-size-1">{{ json_decode(Auth::guard('users')->user()->paga_account)->account_number }}</strong>

                   </div>
                    <div style="height:auto;padding:10px 20px;width:auto;border-radius:5px;" class="bg-primary-01 border-width-1px border-color-primary-02 border-style-solid bg-rgt-005" onclick="copy('{{ json_decode(Auth::guard('users')->user()->paga_account)->account_number }}');this.classList.add('animate__animated','animate__rubberBand');this.addEventListener('animationend',()=>{this.classList.remove('animate__animated','animate__rubberBand')})">Copy</div>
                </div>
                {{-- new row --}}
                <div class="row align-center g-10 space-between">
                <span class="c-primary-light font-weight-700">{{ json_decode(Auth::guard('users')->user()->paga_account)->account_name }}</span>
                    <small class="opacity-07">Auto-fund on transfer</small>
                </div>
               
              </div>
            @else
              <form method="POST" action="{{ url('users/post/generate/paga/account/process') }}" onsubmit="PostRequest(event,this,Updated)" class="analytics max-w-500 m-x-auto column g-10">
               <div class="column w-full align-center text-center g-10 justify-center">
                <img src="{{ asset('banners/IMG_7936.png') }}" alt="" class="no-pointer w-150">
              <span>Fill the form below to generate your Paga account number for Automatic Deposits.</span>
            </div>
                {{-- csrf token --}}
               <input type="hidden" class="input inp required" name="_token" value="{{ @csrf_token() }}">
                {{-- new input --}}
                <div class="column g-5 w-full">
                 <label>Enter First Name</label>
                <div class="cont">
                    <input name="first_name" placeholder="Enter your first name" type="text" class="inp input required">
                </div>
               </div>
               {{-- new input --}}
                <div class="column g-5 w-full">
                 <label>Enter Last Name</label>
                <div class="cont">
                    <input name="last_name" placeholder="Enter your last name" type="text" class="inp input required">
                </div>
               </div>
               {{-- new input --}}
                <div class="column g-5 w-full">
                 <label>Enter Email Address</label>
                <div class="cont">
                    <input name="email" placeholder="Enter your email address" type="email" class="inp input required">
                </div>
               </div>
                
             <button class="post">Generate My Account Number</button>
            </form>
            @endisset
          
        
            @isset(Auth::guard('users')->user()->paga_account)
                   {{-- group --}}
          <section style="transform:translateY(-30px)" class="group w-full column g-10">
             

              {{-- new div --}}
            <div class="column w-full bg-light br-10 g-10 p-20">
                <strong class="font-1">Recharge Instructions</strong>
               
                 {{-- new row --}}
                <div class="row g-5">
                    <i class="c-green">
                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="15" width="15"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>

                    </i>
                    <span>Copy the account details above and login to your mobile banking or ussd to make the transfer</span>
                </div>
                  {{-- new row --}}
                <div class="row g-5">
                    <i class="c-green">
                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="15" width="15"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>

                    </i>
                    <span>Transfer your recharge amount into the account details</span>
                </div>
                 
                 {{-- new row --}}
                <div class="row g-5">
                    <i class="c-green">
                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="15" width="15"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg>

                    </i>
                    <span>Your wallet would be automatically updated on transfer success, Note that the deposit is automatic.</span>
                </div>
            </div>
          </section>
            @endisset
          
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