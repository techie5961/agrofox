@extends('layout.users.app')
@section('title')
    Dashboard
@endsection
@section('css')
    <style class="css">
            .nav-links{
            user-select:none;
            -webkit-user-select:none;
            }
            .nav-links > div{
            display:flex;
            flex-direction: column;
            align-items:center;
            justify-content:center;
            width:100%;
            gap:5px;
            text-align: center;
            cursor: pointer;
            font-weight:600;
            }
            .nav-links .icon{
            width:50px;
            aspect-ratio:1;
            flex-shrink: 0;
            border-radius:50%;
            display:flex;
            align-items: center;
            justify-content: center;
            }
            .quick-actions{
            width:100%;
            padding:10px;
            border-radius:5px;
            display: flex;
            flex-direction: column;
            gap:10px;
            position: relative;
            overflow:hidden;


            }
            .quick-actions::after{
            content:'';
            position: absolute;
            bottom:0;
            right:0;
            width:50%;
            background:rgba(255,255,255,0.1);
            z-index:10;

            }
            .quick-actions > div{
            position: relative;
            z-index:100;

            }
            .package-card{
            width: 100%;
            border-radius:10px;
            overflow:hidden;
            background:var(--bg-light);
            padding:10px;


            }
            .package-card .img{
            /* max-height: 200px; */
            overflow:hidden;
            position: relative;
            border-radius:10px;
            height:100%;
            background-size:cover;
            background-position: center;
            padding-top:50%;
            }
            .package-card .img > div{
            position: relative;
            z-index:100;
            color:white;
            }
            .package-card .img::after{
            content:'';
            position: absolute;
            bottom:0;
            left:0;
            right:0;
            background:linear-gradient(to top,var(--bg-light) 0%,rgba(var(--bg-light-rgb),0.8) 65%,rgba(var(--bg-light-rgb),0.1) 100%);
            overflow:hidden;
            height:100%;
            z-index:10;
            width:100%;

            }
            .welcome-message{
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.2);
            z-index:4000;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding:20px;
            display: flex;
            align-items:center;
            justify-content: center;
            flex-direction: column;
            display:none;
            }
            .welcome-message.active{
            display:flex;
            }

            .welcome-message  .child{
            width:100%;
            max-width:500px;
            background:var(--bg);
            padding:20px;
            border-radius:5px;
            max-height:70%;
            display:flex;
            flex-direction:column;
            gap:10px;
            }
            .welcome-message  .child.active{
            animation:bounceInDown 2s ease forwards;
            }
            .welcome-message  .child.inactive{
            animation:zoomInDown 2s ease reverse forwards;
            }



            body:has(.welcome-message.active){
            overflow: hidden;
            }

            div.banner{
            width:100%;
            position:relative;



            }
           .glitch-button,
           .glitch-button::after {
            padding: 16px 20px;
            font-size: 0.8rem;
            background: linear-gradient(45deg, transparent 5%, var(--secondary) 5%);
            border: 0;
            color: #fff;
            letter-spacing: 3px;
            line-height: 1;
            box-shadow: 6px 0px 0px var(--primary-light);
            outline: transparent;
            position: relative;
            width:100%;
            }

           .glitch-button::after {
            --slice-0: inset(50% 50% 50% 50%);
            --slice-1: inset(80% -6px 0 0);
            --slice-2: inset(50% -6px 30% 0);
            --slice-3: inset(10% -6px 85% 0);
            --slice-4: inset(40% -6px 43% 0);
            --slice-5: inset(80% -6px 5% 0);
            content: "HOVER ME";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 3%, var(--primary-light) 3%, var(--primary-light) 5%, var(--secondary) 5%);
            text-shadow: -3px -3px 0px var(--secondary), 3px 3px 0px var(--primary-light);
            clip-path: var(--slice-0);
            }

           .glitch-button:hover::after {
            animation: 1s glitch;
            animation-timing-function: steps(2, end);
            }

            @keyframes glitch {
            0% {
            clip-path: var(--slice-1);
            transform: translate(-20px, -10px);
            }

            10% {
            clip-path: var(--slice-3);
            transform: translate(10px, 10px);
            }

            20% {
            clip-path: var(--slice-1);
            transform: translate(-10px, 10px);
            }

            30% {
            clip-path: var(--slice-3);
            transform: translate(0px, 5px);
            }

            40% {
            clip-path: var(--slice-2);
            transform: translate(-5px, 0px);
            }

            50% {
            clip-path: var(--slice-3);
            transform: translate(5px, 0px);
            }

            60% {
            clip-path: var(--slice-4);
            transform: translate(5px, 10px);
            }

            70% {
            clip-path: var(--slice-2);
            transform: translate(-10px, 10px);
            }

            80% {
            clip-path: var(--slice-5);
            transform: translate(20px, -10px);
            }

            90% {
            clip-path: var(--slice-1);
            transform: translate(-10px, 0px);
            }

            100% {
            clip-path: var(--slice-1);
            transform: translate(0);
            }
            }


            /* media query for pc */
            @media(min-width:800px){
            img[alt=Banner]{
            max-height:150px;
            max-width:500px;
            margin:auto;
            }
            .quick-actions{
            max-width:70%;

            }
            }
            .group.active{
                transform:translateY(5px) scale(0.95);
            }
         
    </style>
@endsection
@section('main')

    <section x-data="{ 
        Overlay : false,
        Package : {
            ID : '',
            Name : '',
            Cost : '',
            DailyIncome : '',
            Cycle : '',
            TotalIncome : '',
           
        },
         Populate : true
     }" x-init="
     document.body.classList.add('overflow-hidden');
     $watch('Overlay', (value) => {
        if(value){
            document.body.classList.add('overflow-hidden');
            $refs.Group.classList.add('active');
        }else{
            document.body.classList.remove('overflow-hidden');
            $refs.Group.classList.remove('active');


        }
     });
     $watch('Populate', (value) => {
        if(value){
            document.body.classList.add('overflow-hidden')
        }else{
            document.body.classList.remove('overflow-hidden')

        }
     })
     " class="w-full column">
     {{-- modal --}}
     <section x-show="Populate" x-transition:leave-start="fade-leave" x-transition:leave-end="fade-leave-end" x-on:click="
     Populate = false;
     " class="pos-fixed transition-all p-20px column align-center justify-center inset-0 bg-black-transparent z-index-3000 backdrop-blur-5px">
        <div x-on:click.stop="" style="max-width:500px;max-height:90%;" class="w-full h-fit bg br-10px column align-center">
            {{-- head --}}
            <div class="p-20px pos-sticky stick-top w-full column g-10px align-center">
               <div x-on:click="Populate = false;" class="h-30px m-left-auto perfect-square circle bg-rgt-01 column align-center justify-center">
                <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>

               </div>
            <img src="{{ asset(config('settings.logo')) }}" alt="" class="h-100px">
                <strong class="font-size-1 text-center font-weight-900">✨Welcome to {{ config('app.name') }} official platform✨</strong>

            </div>
            {{-- body --}}
            <div class="w-full overflow-auto border-top-width-1px border-top-style-solid border-top-color-rgt-01 border-bottom-width-1px border-bottom-style-solid border-bottom-color-rgt-01 bg-rgt-003 p-20px column g-10px">
            {{-- new --}}
            <div class="font-weight-800">💵 Welcome Bonus: {{ $CurrencyHelper::format($finance_settings->welcome_bonus,'NGN',$display_currency) }}</div>
            <div class="font-weight-800">🎁 Daily Gift code: up to {{ $CurrencyHelper::format(1000,'NGN',$display_currency) }}</div>
            <div class="font-weight-800">🔥 Referral Bonus: up to {{ $CurrencyHelper::format(100000,'NGN',$display_currency) }}</div>
            <div class="font-weight-800">🔥 Earn up to {{ number_format($referral_settings->level_1) }}% commission through referral program</div>
            <div class="font-weight-800">🔥 The more members in your team, the higher your earnings! the larger your team size, the greater the rewards!</div>
            </div>
            <div class="w-full pos-sticky bottom-0 column p-20px g-10px">
                <button x-on:click="window.open('{{ $social_settings->telegram_community }}')" class="btn-telegram p-10px br-10px">Join Telegram</button>
                <button x-on:click="window.open('{{ $social_settings->whatsapp_community }}')" class="btn-whatsapp p-10px br-10px">Join Whatsapp</button>
            </div>

        </div>
     </section>
     {{-- main section --}}
       <section x-ref="Group" class="w-full column transition-all group">
       <div class="row m-bottom-10px g-10px">
        <img src="{{ asset('logos\5963260214884634285.png') }}" alt="" class="h-40px bg-light no-select no-pointer w-40px circle box-shadow">
         <div class="column">
            <small class="opacity-07">Welcome Back</small>
            <strong class="font-size-1 font-weight-900">{{ Auth::guard('users')->user()->phone }}</strong>
        </div>
        {{-- currency toggle --}}
        <div x-data="{ 
            ShowToggle : false
         }" x-on:click="ShowToggle = !ShowToggle" class="w-fit no-select pos-relative row align-center g-10px m-left-auto bg-light br-5px box-shadow p-10px">
        <div class="row align-center g-5px">
            @if (Auth::guard('users')->user()->display_currency == 'NGN')
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><title>nigeria</title><g><path fill="#fff" d="M10 4H22V28H10z"></path><path d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#3b8655"></path><path d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 26 16)" fill="#3b8655"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></g></svg>
                
            @else
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><title>united-states</title><g><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect><path d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z" fill="#a62842"></path><path d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z" fill="#a62842"></path><path fill="#a62842" d="M2 11.385H31V13.231H2z"></path><path fill="#a62842" d="M2 15.077H31V16.923000000000002H2z"></path><path fill="#a62842" d="M1 18.769H31V20.615H1z"></path><path d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z" fill="#a62842"></path><path d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z" fill="#a62842"></path><path d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z" fill="#102d5e"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path fill="#fff" d="M4.601 7.463L5.193 7.033 4.462 7.033 4.236 6.338 4.01 7.033 3.279 7.033 3.87 7.463 3.644 8.158 4.236 7.729 4.827 8.158 4.601 7.463z"></path><path fill="#fff" d="M7.58 7.463L8.172 7.033 7.441 7.033 7.215 6.338 6.989 7.033 6.258 7.033 6.849 7.463 6.623 8.158 7.215 7.729 7.806 8.158 7.58 7.463z"></path><path fill="#fff" d="M10.56 7.463L11.151 7.033 10.42 7.033 10.194 6.338 9.968 7.033 9.237 7.033 9.828 7.463 9.603 8.158 10.194 7.729 10.785 8.158 10.56 7.463z"></path><path fill="#fff" d="M6.066 9.283L6.658 8.854 5.927 8.854 5.701 8.158 5.475 8.854 4.744 8.854 5.335 9.283 5.109 9.979 5.701 9.549 6.292 9.979 6.066 9.283z"></path><path fill="#fff" d="M9.046 9.283L9.637 8.854 8.906 8.854 8.68 8.158 8.454 8.854 7.723 8.854 8.314 9.283 8.089 9.979 8.68 9.549 9.271 9.979 9.046 9.283z"></path><path fill="#fff" d="M12.025 9.283L12.616 8.854 11.885 8.854 11.659 8.158 11.433 8.854 10.702 8.854 11.294 9.283 11.068 9.979 11.659 9.549 12.251 9.979 12.025 9.283z"></path><path fill="#fff" d="M6.066 12.924L6.658 12.494 5.927 12.494 5.701 11.799 5.475 12.494 4.744 12.494 5.335 12.924 5.109 13.619 5.701 13.19 6.292 13.619 6.066 12.924z"></path><path fill="#fff" d="M9.046 12.924L9.637 12.494 8.906 12.494 8.68 11.799 8.454 12.494 7.723 12.494 8.314 12.924 8.089 13.619 8.68 13.19 9.271 13.619 9.046 12.924z"></path><path fill="#fff" d="M12.025 12.924L12.616 12.494 11.885 12.494 11.659 11.799 11.433 12.494 10.702 12.494 11.294 12.924 11.068 13.619 11.659 13.19 12.251 13.619 12.025 12.924z"></path><path fill="#fff" d="M13.539 7.463L14.13 7.033 13.399 7.033 13.173 6.338 12.947 7.033 12.216 7.033 12.808 7.463 12.582 8.158 13.173 7.729 13.765 8.158 13.539 7.463z"></path><path fill="#fff" d="M4.601 11.104L5.193 10.674 4.462 10.674 4.236 9.979 4.01 10.674 3.279 10.674 3.87 11.104 3.644 11.799 4.236 11.369 4.827 11.799 4.601 11.104z"></path><path fill="#fff" d="M7.58 11.104L8.172 10.674 7.441 10.674 7.215 9.979 6.989 10.674 6.258 10.674 6.849 11.104 6.623 11.799 7.215 11.369 7.806 11.799 7.58 11.104z"></path><path fill="#fff" d="M10.56 11.104L11.151 10.674 10.42 10.674 10.194 9.979 9.968 10.674 9.237 10.674 9.828 11.104 9.603 11.799 10.194 11.369 10.785 11.799 10.56 11.104z"></path><path fill="#fff" d="M13.539 11.104L14.13 10.674 13.399 10.674 13.173 9.979 12.947 10.674 12.216 10.674 12.808 11.104 12.582 11.799 13.173 11.369 13.765 11.799 13.539 11.104z"></path><path fill="#fff" d="M4.601 14.744L5.193 14.315 4.462 14.315 4.236 13.619 4.01 14.315 3.279 14.315 3.87 14.744 3.644 15.44 4.236 15.01 4.827 15.44 4.601 14.744z"></path><path fill="#fff" d="M7.58 14.744L8.172 14.315 7.441 14.315 7.215 13.619 6.989 14.315 6.258 14.315 6.849 14.744 6.623 15.44 7.215 15.01 7.806 15.44 7.58 14.744z"></path><path fill="#fff" d="M10.56 14.744L11.151 14.315 10.42 14.315 10.194 13.619 9.968 14.315 9.237 14.315 9.828 14.744 9.603 15.44 10.194 15.01 10.785 15.44 10.56 14.744z"></path><path fill="#fff" d="M13.539 14.744L14.13 14.315 13.399 14.315 13.173 13.619 12.947 14.315 12.216 14.315 12.808 14.744 12.582 15.44 13.173 15.01 13.765 15.44 13.539 14.744z"></path></g></svg>
                
            @endif
            <span>{{ Auth::guard('users')->user()->display_currency }}</span>
        </div>
        <i>
            <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>

        </i>
        {{-- positioned div --}}
        <div x-transition:leave-start="height-leave" x-transition:leave-end="height-leave-end" x-transition:enter-start="height-enter" x-transition:enter-end="height-enter-end" x-show="ShowToggle" x-on:click.stop="" class="pos-absolute box-shadow z-index-2000 top-full left-0 bg-light right-0 br-5px transition-all column">
            {{-- new --}}
            <div x-on:click="Vitecss.navigate('{{ url('users/dashboard/switch/currency?currency=NGN') }}')" x-on:touchstart="$el.classList.add('bg-rgt-003')" x-on:touchend="$el.classList.remove('bg-rgt-003')" class="row  pc-pointer p-10px align-center g-5px">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><title>nigeria</title><g><path fill="#fff" d="M10 4H22V28H10z"></path><path d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#3b8655"></path><path d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 26 16)" fill="#3b8655"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></g></svg>

            <span>NGN</span>
        </div>
         {{-- new --}}
            <div x-on:click="Vitecss.navigate('{{ url('users/dashboard/switch/currency?currency=USD') }}')" x-on:touchstart="$el.classList.add('bg-rgt-003')" x-on:touchend="$el.classList.remove('bg-rgt-003')" class="row pc-pointer p-10px align-center g-5px">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><title>united-states</title><g><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect><path d="M1.638,5.846H30.362c-.711-1.108-1.947-1.846-3.362-1.846H5c-1.414,0-2.65,.738-3.362,1.846Z" fill="#a62842"></path><path d="M2.03,7.692c-.008,.103-.03,.202-.03,.308v1.539H31v-1.539c0-.105-.022-.204-.03-.308H2.03Z" fill="#a62842"></path><path fill="#a62842" d="M2 11.385H31V13.231H2z"></path><path fill="#a62842" d="M2 15.077H31V16.923000000000002H2z"></path><path fill="#a62842" d="M1 18.769H31V20.615H1z"></path><path d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z" fill="#a62842"></path><path d="M30.362,26.154H1.638c.711,1.108,1.947,1.846,3.362,1.846H27c1.414,0,2.65-.738,3.362-1.846Z" fill="#a62842"></path><path d="M5,4h11v12.923H1V8c0-2.208,1.792-4,4-4Z" fill="#102d5e"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path fill="#fff" d="M4.601 7.463L5.193 7.033 4.462 7.033 4.236 6.338 4.01 7.033 3.279 7.033 3.87 7.463 3.644 8.158 4.236 7.729 4.827 8.158 4.601 7.463z"></path><path fill="#fff" d="M7.58 7.463L8.172 7.033 7.441 7.033 7.215 6.338 6.989 7.033 6.258 7.033 6.849 7.463 6.623 8.158 7.215 7.729 7.806 8.158 7.58 7.463z"></path><path fill="#fff" d="M10.56 7.463L11.151 7.033 10.42 7.033 10.194 6.338 9.968 7.033 9.237 7.033 9.828 7.463 9.603 8.158 10.194 7.729 10.785 8.158 10.56 7.463z"></path><path fill="#fff" d="M6.066 9.283L6.658 8.854 5.927 8.854 5.701 8.158 5.475 8.854 4.744 8.854 5.335 9.283 5.109 9.979 5.701 9.549 6.292 9.979 6.066 9.283z"></path><path fill="#fff" d="M9.046 9.283L9.637 8.854 8.906 8.854 8.68 8.158 8.454 8.854 7.723 8.854 8.314 9.283 8.089 9.979 8.68 9.549 9.271 9.979 9.046 9.283z"></path><path fill="#fff" d="M12.025 9.283L12.616 8.854 11.885 8.854 11.659 8.158 11.433 8.854 10.702 8.854 11.294 9.283 11.068 9.979 11.659 9.549 12.251 9.979 12.025 9.283z"></path><path fill="#fff" d="M6.066 12.924L6.658 12.494 5.927 12.494 5.701 11.799 5.475 12.494 4.744 12.494 5.335 12.924 5.109 13.619 5.701 13.19 6.292 13.619 6.066 12.924z"></path><path fill="#fff" d="M9.046 12.924L9.637 12.494 8.906 12.494 8.68 11.799 8.454 12.494 7.723 12.494 8.314 12.924 8.089 13.619 8.68 13.19 9.271 13.619 9.046 12.924z"></path><path fill="#fff" d="M12.025 12.924L12.616 12.494 11.885 12.494 11.659 11.799 11.433 12.494 10.702 12.494 11.294 12.924 11.068 13.619 11.659 13.19 12.251 13.619 12.025 12.924z"></path><path fill="#fff" d="M13.539 7.463L14.13 7.033 13.399 7.033 13.173 6.338 12.947 7.033 12.216 7.033 12.808 7.463 12.582 8.158 13.173 7.729 13.765 8.158 13.539 7.463z"></path><path fill="#fff" d="M4.601 11.104L5.193 10.674 4.462 10.674 4.236 9.979 4.01 10.674 3.279 10.674 3.87 11.104 3.644 11.799 4.236 11.369 4.827 11.799 4.601 11.104z"></path><path fill="#fff" d="M7.58 11.104L8.172 10.674 7.441 10.674 7.215 9.979 6.989 10.674 6.258 10.674 6.849 11.104 6.623 11.799 7.215 11.369 7.806 11.799 7.58 11.104z"></path><path fill="#fff" d="M10.56 11.104L11.151 10.674 10.42 10.674 10.194 9.979 9.968 10.674 9.237 10.674 9.828 11.104 9.603 11.799 10.194 11.369 10.785 11.799 10.56 11.104z"></path><path fill="#fff" d="M13.539 11.104L14.13 10.674 13.399 10.674 13.173 9.979 12.947 10.674 12.216 10.674 12.808 11.104 12.582 11.799 13.173 11.369 13.765 11.799 13.539 11.104z"></path><path fill="#fff" d="M4.601 14.744L5.193 14.315 4.462 14.315 4.236 13.619 4.01 14.315 3.279 14.315 3.87 14.744 3.644 15.44 4.236 15.01 4.827 15.44 4.601 14.744z"></path><path fill="#fff" d="M7.58 14.744L8.172 14.315 7.441 14.315 7.215 13.619 6.989 14.315 6.258 14.315 6.849 14.744 6.623 15.44 7.215 15.01 7.806 15.44 7.58 14.744z"></path><path fill="#fff" d="M10.56 14.744L11.151 14.315 10.42 14.315 10.194 13.619 9.968 14.315 9.237 14.315 9.828 14.744 9.603 15.44 10.194 15.01 10.785 15.44 10.56 14.744z"></path><path fill="#fff" d="M13.539 14.744L14.13 14.315 13.399 14.315 13.173 13.619 12.947 14.315 12.216 14.315 12.808 14.744 12.582 15.44 13.173 15.01 13.765 15.44 13.539 14.744z"></path></g></svg>

            <span>USD</span>
        </div>
        </div>
        </div>
       </div>
         <div x-data="{ 
            HideBalance : $persist(false).as('dashboard-balance')
          }" class="w-full m-bottom-20px column br-15px">
           
    <div class="w-full br-15px column pos-relative z-index-200 g-10px p-20px p-bottom-0 bg-primary primary-text">
        {{-- new row --}}
        <div class="row align-center g-10px space-between">
        <span class="opacity-07 font-weight-800 uppercase">Total Balance</span>
            <i x-on:click="HideBalance = !HideBalance">
                <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"></path></svg>

            </i>
        </div>
        <strong x-show="!HideBalance" class="font-size-1-5 font-weight-900">
            {{ $total_balance }}
        </strong>
<strong x-show="HideBalance" class="font-size-1 font-weight-900">****</strong>

        {{-- new row --}}
        <div class="row w-full g-10px align-center">
    <button x-data="{ 
        Link : '{{ url('users/recharge') }}'
     }" x-on:click="Vitecss.navigate(Link)" class="glitch-button">RECHARGE</button>
    <button  x-data="{ 
        Link : '{{ url('users/withdraw') }}'
     }" x-on:click="Vitecss.navigate(Link)" class="glitch-button">WITHDRAW</button>
           
            </div>
        {{-- new --}}
        <div class="w-full p-bottom-10px secondary-text bg-secondary column g-10px p-15px br-top-left-15px br-top-right-15px">
            {{-- new row --}}
            <div class="row w-full align-center space-between g-10px">
                <span class="opacity-07 font-weight-800 uppercase text-shadow">Deposit</span>
<strong x-show="!HideBalance" class="font-size-1 font-weight-900">{{ $deposit_balance }}</strong>
<strong x-show="HideBalance" class="font-size-1 font-weight-900">****</strong>
            </div>
             {{-- new row --}}
            <div class="row w-full align-center space-between g-10px">
                <span class="opacity-07 font-weight-800 uppercase text-shadow">Withdrawal</span>
<strong x-show="!HideBalance" class="font-size-1 font-weight-900">{{ $main_balance }}</strong>
<strong x-show="HideBalance" class="font-size-1 font-weight-900">****</strong>
            </div>
        </div>
    </div>
        </div>
        {{-- quick links --}}
        <div x-data="{  }" class="w-full row align-center g-10px">
            <div x-on:click="Vitecss.navigate('{{ url('users/recharge') }}')" class="column border-width-1px border-style-solid border-color-rgt-01 bg-light p-10px br-10px box-shadow w-full g-10px align-center text-center">
                <i>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>wallet-content</title><g fill="none"><path d="M14.4109 1.93153C16.3338 1.61105 17.2953 1.4508 18.0446 1.72912C18.7021 1.97335 19.2533 2.44027 19.6023 3.04871C20 3.74207 20 4.71679 20 6.66622V10.9338C20 12.3784 20 13.1007 19.7372 13.6866C19.5055 14.203 19.1325 14.6433 18.6612 14.9567C18.1265 15.3123 17.4141 15.431 15.9891 15.6685L7.58912 17.0685C5.6662 17.389 4.70475 17.5492 3.95544 17.2709C3.2979 17.0267 2.74672 16.5598 2.39771 15.9513C2 15.258 2 14.2832 2 12.3338L2 10.777C2 8.36935 2 7.16551 2.43802 6.18911C2.82412 5.32843 3.44583 4.59453 4.23133 4.07218C5.12242 3.47961 6.30989 3.2817 8.68481 2.88588L14.4109 1.93153Z" fill="url(#1752500502812-6140456_wallet-content_existing_0_d1aul02tk)" data-glass="origin" mask="url(#1752500502812-6140456_wallet-content_mask_qkctbcwzb)"></path><path d="M14.4109 1.93153C16.3338 1.61105 17.2953 1.4508 18.0446 1.72912C18.7021 1.97335 19.2533 2.44027 19.6023 3.04871C20 3.74207 20 4.71679 20 6.66622V10.9338C20 12.3784 20 13.1007 19.7372 13.6866C19.5055 14.203 19.1325 14.6433 18.6612 14.9567C18.1265 15.3123 17.4141 15.431 15.9891 15.6685L7.58912 17.0685C5.6662 17.389 4.70475 17.5492 3.95544 17.2709C3.2979 17.0267 2.74672 16.5598 2.39771 15.9513C2 15.258 2 14.2832 2 12.3338L2 10.777C2 8.36935 2 7.16551 2.43802 6.18911C2.82412 5.32843 3.44583 4.59453 4.23133 4.07218C5.12242 3.47961 6.30989 3.2817 8.68481 2.88588L14.4109 1.93153Z" fill="url(#1752500502812-6140456_wallet-content_existing_0_d1aul02tk)" data-glass="clone" filter="url(#1752500502812-6140456_wallet-content_filter_69p3uk0u4)" clip-path="url(#1752500502812-6140456_wallet-content_clipPath_h7u17fg1w)"></path><path d="M15.6 5C17.8402 5 18.9603 5 19.816 5.43597C20.5686 5.81947 21.1805 6.43139 21.564 7.18404C22 8.03969 22 9.15979 22 11.4L22 15.6C22 17.8402 22 18.9603 21.564 19.816C21.1805 20.5686 20.5686 21.1805 19.816 21.564C18.9603 22 17.8402 22 15.6 22L8.4 22C6.15979 22 5.03968 22 4.18404 21.564C3.43139 21.1805 2.81947 20.5686 2.43597 19.816C2 18.9603 2 17.8402 2 15.6L2 11.4C2 9.15979 2 8.03968 2.43597 7.18404C2.81947 6.43139 3.43139 5.81947 4.18404 5.43597C5.03968 5 6.15979 5 8.4 5L15.6 5Z" fill="url(#1752500502812-6140456_wallet-content_existing_1_7cu7qxlwm)" data-glass="blur"></path><path d="M15.5996 21.25V22H8.40039V21.25H15.5996ZM21.25 15.5996V11.4004C21.25 10.268 21.2497 9.46335 21.1982 8.83398C21.1475 8.21336 21.0506 7.82889 20.8955 7.52441C20.5839 6.91305 20.087 6.41605 19.4756 6.10449C19.1711 5.94936 18.7866 5.85247 18.166 5.80176C17.5367 5.75035 16.732 5.75 15.5996 5.75H8.40039C7.26798 5.75 6.46335 5.75035 5.83398 5.80176C5.21336 5.85247 4.82889 5.94936 4.52441 6.10449C3.91305 6.41605 3.41605 6.91305 3.10449 7.52441C2.94936 7.82889 2.85247 8.21336 2.80176 8.83398C2.75035 9.46335 2.75 10.268 2.75 11.4004V15.5996C2.75 16.732 2.75035 17.5367 2.80176 18.166C2.85247 18.7866 2.94936 19.1711 3.10449 19.4756C3.41605 20.087 3.91304 20.5839 4.52441 20.8955C4.82889 21.0506 5.21336 21.1475 5.83398 21.1982C6.46335 21.2497 7.26798 21.25 8.40039 21.25V22L6.91602 21.9932C5.72431 21.9744 4.96088 21.9041 4.34766 21.6406L4.18359 21.5645C3.52512 21.2289 2.97413 20.7183 2.58984 20.0918L2.43555 19.8164C1.99957 18.9608 2 17.8398 2 15.5996V11.4004C2 9.16018 1.99957 8.03924 2.43555 7.18359C2.81902 6.43109 3.43109 5.81902 4.18359 5.43555C4.82525 5.10861 5.61607 5.02728 6.91602 5.00684L8.40039 5H15.5996C17.8398 5 18.9608 4.99957 19.8164 5.43555C20.5689 5.81902 21.181 6.43109 21.5645 7.18359C22.0004 8.03924 22 9.16018 22 11.4004V15.5996C22 17.8398 22.0004 18.9608 21.5645 19.8164L21.4102 20.0918C21.0259 20.7183 20.4749 21.2289 19.8164 21.5645L19.6523 21.6406C18.816 21.9999 17.6999 22 15.5996 22V21.25C16.732 21.25 17.5367 21.2497 18.166 21.1982C18.7866 21.1475 19.1711 21.0506 19.4756 20.8955C20.087 20.5839 20.5839 20.087 20.8955 19.4756C21.0506 19.1711 21.1475 18.7866 21.1982 18.166C21.2497 17.5367 21.25 16.732 21.25 15.5996Z" fill="url(#1752500502812-6140456_wallet-content_existing_2_62o0vvap5)"></path><path d="M22 10H18.5C16.567 10 15 11.567 15 13.5C15 15.433 16.567 17 18.5 17H22C22.5523 17 23 16.5523 23 16V11C23 10.4477 22.5523 10 22 10Z" fill="url(#1752500502812-6140456_wallet-content_existing_3_pdgfrbs9f)"></path><defs><linearGradient id="1752500502812-6140456_wallet-content_existing_0_d1aul02tk" x1="11" y1="1.586" x2="11" y2="17.414" gradientUnits="userSpaceOnUse"><stop stop-color="#575757"></stop><stop offset="1" stop-color="#151515"></stop></linearGradient><linearGradient id="1752500502812-6140456_wallet-content_existing_1_7cu7qxlwm" x1="22" y1="13.5" x2="2" y2="13.5" gradientUnits="userSpaceOnUse"><stop stop-color="#E3E3E599"></stop><stop offset="1" stop-color="#BBBBC099"></stop></linearGradient><linearGradient id="1752500502812-6140456_wallet-content_existing_2_62o0vvap5" x1="12" y1="5" x2="12" y2="14.845" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><linearGradient id="1752500502812-6140456_wallet-content_existing_3_pdgfrbs9f" x1="19" y1="10" x2="19" y2="17" gradientUnits="userSpaceOnUse"><stop stop-color="#575757"></stop><stop offset="1" stop-color="#151515"></stop></linearGradient><filter id="1752500502812-6140456_wallet-content_filter_69p3uk0u4" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter><clipPath id="1752500502812-6140456_wallet-content_clipPath_h7u17fg1w"><path d="M15.6 5C17.8402 5 18.9603 5 19.816 5.43597C20.5686 5.81947 21.1805 6.43139 21.564 7.18404C22 8.03969 22 9.15979 22 11.4L22 15.6C22 17.8402 22 18.9603 21.564 19.816C21.1805 20.5686 20.5686 21.1805 19.816 21.564C18.9603 22 17.8402 22 15.6 22L8.4 22C6.15979 22 5.03968 22 4.18404 21.564C3.43139 21.1805 2.81947 20.5686 2.43597 19.816C2 18.9603 2 17.8402 2 15.6L2 11.4C2 9.15979 2 8.03968 2.43597 7.18404C2.81947 6.43139 3.43139 5.81947 4.18404 5.43597C5.03968 5 6.15979 5 8.4 5L15.6 5Z" fill="url(#1752500502812-6140456_wallet-content_existing_1_7cu7qxlwm)"></path></clipPath><mask id="1752500502812-6140456_wallet-content_mask_qkctbcwzb"><rect width="100%" height="100%" fill="#FFF"></rect><path d="M15.6 5C17.8402 5 18.9603 5 19.816 5.43597C20.5686 5.81947 21.1805 6.43139 21.564 7.18404C22 8.03969 22 9.15979 22 11.4L22 15.6C22 17.8402 22 18.9603 21.564 19.816C21.1805 20.5686 20.5686 21.1805 19.816 21.564C18.9603 22 17.8402 22 15.6 22L8.4 22C6.15979 22 5.03968 22 4.18404 21.564C3.43139 21.1805 2.81947 20.5686 2.43597 19.816C2 18.9603 2 17.8402 2 15.6L2 11.4C2 9.15979 2 8.03968 2.43597 7.18404C2.81947 6.43139 3.43139 5.81947 4.18404 5.43597C5.03968 5 6.15979 5 8.4 5L15.6 5Z" fill="#000"></path></mask></defs></g></svg>

                </i>
                <small class="font-weight-900">Recharge</small>
            </div>
             <div x-on:click="Vitecss.navigate('{{ url('users/withdraw') }}')" class="column border-width-1px border-style-solid border-color-rgt-01 bg-light p-10px br-10px box-shadow w-full g-10px align-center text-center">
                  <i>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>credit-cards</title><g fill="none"><path d="M13.6 17H7.4C5.15979 17 4.03968 17 3.18404 16.564C2.43139 16.1805 1.81947 15.5686 1.43597 14.816C1 13.9603 1 12.8402 1 10.6V8.4C1 6.15979 1 5.03968 1.43597 4.18404C1.81947 3.43139 2.43139 2.81947 3.18404 2.43597C4.03969 2 5.15979 2 7.4 2H13.6C15.8402 2 16.9603 2 17.816 2.43597C18.5686 2.81947 19.1805 3.43139 19.564 4.18404C20 5.03969 20 6.15979 20 8.4V11.5H20.1367C20.8156 11.5 21.3302 11.9844 21.4652 12.6037C21.4885 12.4005 21.4998 12.1856 21.5 11.9572L21.5 12.9285C21.5 12.8175 21.488 12.7087 21.4652 12.6037C21.3353 13.736 20.832 14.5061 19.7883 15.2341L18.3057 16.266C18.136 16.3841 17.9701 16.4855 17.816 16.564C16.9603 17 15.8402 17 13.6 17H13.6Z" fill="url(#1752500502781-9514449_credit-cards_existing_0_h0ur9dnrc)" data-glass="origin" mask="url(#1752500502781-9514449_credit-cards_mask_8gqebobad)"></path><path d="M13.6 17H7.4C5.15979 17 4.03968 17 3.18404 16.564C2.43139 16.1805 1.81947 15.5686 1.43597 14.816C1 13.9603 1 12.8402 1 10.6V8.4C1 6.15979 1 5.03968 1.43597 4.18404C1.81947 3.43139 2.43139 2.81947 3.18404 2.43597C4.03969 2 5.15979 2 7.4 2H13.6C15.8402 2 16.9603 2 17.816 2.43597C18.5686 2.81947 19.1805 3.43139 19.564 4.18404C20 5.03969 20 6.15979 20 8.4V11.5H20.1367C20.8156 11.5 21.3302 11.9844 21.4652 12.6037C21.4885 12.4005 21.4998 12.1856 21.5 11.9572L21.5 12.9285C21.5 12.8175 21.488 12.7087 21.4652 12.6037C21.3353 13.736 20.832 14.5061 19.7883 15.2341L18.3057 16.266C18.136 16.3841 17.9701 16.4855 17.816 16.564C16.9603 17 15.8402 17 13.6 17H13.6Z" fill="url(#1752500502781-9514449_credit-cards_existing_0_h0ur9dnrc)" data-glass="clone" filter="url(#1752500502781-9514449_credit-cards_filter_6go60hdxu)" clip-path="url(#1752500502781-9514449_credit-cards_clipPath_ht3xrki19)"></path><path d="M16.5996 7C18.8398 7 19.9608 6.99957 20.8164 7.43555C21.5689 7.81902 22.181 8.43109 22.5645 9.18359C23.0004 10.0392 23 11.1602 23 13.4004V15.5996C23 17.8398 23.0004 18.9608 22.5645 19.8164C22.181 20.5689 21.5689 21.181 20.8164 21.5645C19.9608 22.0004 18.8398 22 16.5996 22H10.4004C8.16018 22 7.03924 22.0004 6.18359 21.5645C5.43109 21.181 4.81902 20.5689 4.43555 19.8164C3.99957 18.9608 4 17.8398 4 15.5996V13.4004C4 11.1602 3.99957 10.0392 4.43555 9.18359C4.81902 8.43109 5.43109 7.81902 6.18359 7.43555C7.03924 6.99957 8.16018 7 10.4004 7H16.5996ZM7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14H20L20.1025 13.9951C20.6067 13.9438 21 13.5177 21 13C21 12.4823 20.6067 12.0562 20.1025 12.0049L20 12H7Z" fill="url(#1752500502781-9514449_credit-cards_existing_1_r1ap0gi70)" data-glass="blur"></path><path d="M16.5996 21.25V22H10.4004V21.25H16.5996ZM22.25 15.5996V13.4004C22.25 12.268 22.2497 11.4634 22.1982 10.834C22.1475 10.2134 22.0506 9.82889 21.8955 9.52441C21.5839 8.91305 21.087 8.41605 20.4756 8.10449C20.1711 7.94936 19.7866 7.85247 19.166 7.80176C18.5367 7.75035 17.732 7.75 16.5996 7.75H10.4004C9.26798 7.75 8.46335 7.75035 7.83398 7.80176C7.21336 7.85247 6.82889 7.94936 6.52441 8.10449C5.91304 8.41605 5.41605 8.91305 5.10449 9.52441C4.94936 9.82889 4.85247 10.2134 4.80176 10.834C4.75035 11.4633 4.75 12.268 4.75 13.4004V15.5996C4.75 16.732 4.75035 17.5367 4.80176 18.166C4.85247 18.7866 4.94936 19.1711 5.10449 19.4756C5.41605 20.087 5.91304 20.5839 6.52441 20.8955C6.82889 21.0506 7.21336 21.1475 7.83398 21.1982C8.46335 21.2497 9.26798 21.25 10.4004 21.25V22L8.91602 21.9932C7.72431 21.9744 6.96088 21.9041 6.34766 21.6406L6.18359 21.5645C5.52512 21.2289 4.97413 20.7183 4.58984 20.0918L4.43555 19.8164C3.99957 18.9608 4 17.8398 4 15.5996V13.4004C4 11.1602 3.99957 10.0392 4.43555 9.18359C4.81902 8.43109 5.43109 7.81902 6.18359 7.43555C6.82525 7.10861 7.61607 7.02728 8.91602 7.00684L10.4004 7H16.5996C18.8398 7 19.9608 6.99957 20.8164 7.43555C21.5689 7.81902 22.181 8.43109 22.5645 9.18359C23.0004 10.0392 23 11.1602 23 13.4004V15.5996C23 17.8398 23.0004 18.9608 22.5645 19.8164L22.4102 20.0918C22.0259 20.7183 21.4749 21.2289 20.8164 21.5645L20.6523 21.6406C19.816 21.9999 18.6999 22 16.5996 22V21.25C17.732 21.25 18.5367 21.2497 19.166 21.1982C19.7866 21.1475 20.1711 21.0506 20.4756 20.8955C21.087 20.5839 21.5839 20.087 21.8955 19.4756C22.0506 19.1711 22.1475 18.7866 22.1982 18.166C22.2497 17.5367 22.25 16.732 22.25 15.5996Z" fill="url(#1752500502781-9514449_credit-cards_existing_2_e277aq1xq)"></path><defs><linearGradient id="1752500502781-9514449_credit-cards_existing_0_h0ur9dnrc" x1="11.25" y1="2" x2="11.25" y2="17" gradientUnits="userSpaceOnUse"><stop stop-color="#575757"></stop><stop offset="1" stop-color="#151515"></stop></linearGradient><linearGradient id="1752500502781-9514449_credit-cards_existing_1_r1ap0gi70" x1="13.5" y1="7" x2="13.5" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="#E3E3E599"></stop><stop offset="1" stop-color="#BBBBC099"></stop></linearGradient><linearGradient id="1752500502781-9514449_credit-cards_existing_2_e277aq1xq" x1="13.5" y1="7" x2="13.5" y2="15.687" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><filter id="1752500502781-9514449_credit-cards_filter_6go60hdxu" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter><clipPath id="1752500502781-9514449_credit-cards_clipPath_ht3xrki19"><path d="M16.5996 7C18.8398 7 19.9608 6.99957 20.8164 7.43555C21.5689 7.81902 22.181 8.43109 22.5645 9.18359C23.0004 10.0392 23 11.1602 23 13.4004V15.5996C23 17.8398 23.0004 18.9608 22.5645 19.8164C22.181 20.5689 21.5689 21.181 20.8164 21.5645C19.9608 22.0004 18.8398 22 16.5996 22H10.4004C8.16018 22 7.03924 22.0004 6.18359 21.5645C5.43109 21.181 4.81902 20.5689 4.43555 19.8164C3.99957 18.9608 4 17.8398 4 15.5996V13.4004C4 11.1602 3.99957 10.0392 4.43555 9.18359C4.81902 8.43109 5.43109 7.81902 6.18359 7.43555C7.03924 6.99957 8.16018 7 10.4004 7H16.5996ZM7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14H20L20.1025 13.9951C20.6067 13.9438 21 13.5177 21 13C21 12.4823 20.6067 12.0562 20.1025 12.0049L20 12H7Z" fill="url(#1752500502781-9514449_credit-cards_existing_1_r1ap0gi70)"></path></clipPath><mask id="1752500502781-9514449_credit-cards_mask_8gqebobad"><rect width="100%" height="100%" fill="#FFF"></rect><path d="M16.5996 7C18.8398 7 19.9608 6.99957 20.8164 7.43555C21.5689 7.81902 22.181 8.43109 22.5645 9.18359C23.0004 10.0392 23 11.1602 23 13.4004V15.5996C23 17.8398 23.0004 18.9608 22.5645 19.8164C22.181 20.5689 21.5689 21.181 20.8164 21.5645C19.9608 22.0004 18.8398 22 16.5996 22H10.4004C8.16018 22 7.03924 22.0004 6.18359 21.5645C5.43109 21.181 4.81902 20.5689 4.43555 19.8164C3.99957 18.9608 4 17.8398 4 15.5996V13.4004C4 11.1602 3.99957 10.0392 4.43555 9.18359C4.81902 8.43109 5.43109 7.81902 6.18359 7.43555C7.03924 6.99957 8.16018 7 10.4004 7H16.5996ZM7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14H20L20.1025 13.9951C20.6067 13.9438 21 13.5177 21 13C21 12.4823 20.6067 12.0562 20.1025 12.0049L20 12H7Z" fill="#000"></path></mask></defs></g></svg>

                </i>
                <small class="font-weight-900">Withdraw</small>
            </div>
             <div x-on:click="Vitecss.navigate('{{ url('users/gift/code') }}')" class="column border-width-1px border-style-solid border-color-rgt-01 bg-light p-10px br-10px box-shadow w-full g-10px align-center text-center">
                <i>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>dial</title><g fill="none"><path d="M3.51953 19.0693C3.91006 18.6788 4.54308 18.6788 4.93359 19.0693C5.3241 19.4599 5.32413 20.0929 4.93359 20.4834L4.92676 20.4902C4.53623 20.8807 3.90321 20.8807 3.5127 20.4902C3.1222 20.0997 3.12221 19.4667 3.5127 19.0762L3.51953 19.0693ZM19.0762 19.0693C19.4422 18.7033 20.0213 18.6799 20.4141 19L20.4902 19.0693L20.4971 19.0762L20.5664 19.1523C20.8864 19.5451 20.8631 20.1242 20.4971 20.4902C20.1065 20.8806 19.4735 20.8807 19.083 20.4902L19.0762 20.4834L19.0078 20.4072C18.6873 20.0145 18.7101 19.4355 19.0762 19.0693ZM10.5859 10.5859C11.367 9.80489 12.633 9.80489 13.4141 10.5859L17.4141 14.5859L17.5518 14.7373C18.1926 15.5229 18.1463 16.6818 17.4141 17.4141C16.6818 18.1463 15.5229 18.1926 14.7373 17.5518L14.5859 17.4141L10.5859 13.4141C9.80489 12.633 9.80489 11.367 10.5859 10.5859ZM1.00977 11C1.56205 11 2.00977 11.4477 2.00977 12C2.00977 12.5523 1.56205 13 1.00977 13H1C0.447715 13 0 12.5523 0 12C0 11.4477 0.447715 11 1 11H1.00977ZM23.0098 11C23.562 11 24.0098 11.4477 24.0098 12C24.0098 12.5523 23.562 13 23.0098 13H23C22.4477 13 22 12.5523 22 12C22 11.4477 22.4477 11 23 11H23.0098ZM3.51953 3.5127C3.88578 3.14645 4.46562 3.12363 4.8584 3.44434L4.93359 3.5127L4.94141 3.51953L5.00977 3.5957C5.32994 3.98834 5.30714 4.56748 4.94141 4.93359C4.55088 5.32412 3.91689 5.32412 3.52637 4.93359L3.51953 4.92676C3.12919 4.53626 3.12917 3.90318 3.51953 3.5127ZM19.0762 3.5127C19.4667 3.12221 20.0997 3.1222 20.4902 3.5127C20.8807 3.90321 20.8807 4.53623 20.4902 4.92676L20.4834 4.93359C20.0929 5.32413 19.4599 5.32411 19.0693 4.93359C18.6788 4.54308 18.6788 3.91006 19.0693 3.51953L19.0762 3.5127ZM12 0C12.5523 5.15403e-06 13 0.447718 13 1V1.00977C13 1.56205 12.5523 2.00976 12 2.00977C11.4477 2.00977 11 1.56205 11 1.00977V1C11 0.447715 11.4477 0 12 0Z" fill="url(#1752500502782-6773768_dial_existing_0_de45fjxad)" data-glass="origin" mask="url(#1752500502782-6773768_dial_mask_52ly7uclq)"></path><path d="M3.51953 19.0693C3.91006 18.6788 4.54308 18.6788 4.93359 19.0693C5.3241 19.4599 5.32413 20.0929 4.93359 20.4834L4.92676 20.4902C4.53623 20.8807 3.90321 20.8807 3.5127 20.4902C3.1222 20.0997 3.12221 19.4667 3.5127 19.0762L3.51953 19.0693ZM19.0762 19.0693C19.4422 18.7033 20.0213 18.6799 20.4141 19L20.4902 19.0693L20.4971 19.0762L20.5664 19.1523C20.8864 19.5451 20.8631 20.1242 20.4971 20.4902C20.1065 20.8806 19.4735 20.8807 19.083 20.4902L19.0762 20.4834L19.0078 20.4072C18.6873 20.0145 18.7101 19.4355 19.0762 19.0693ZM10.5859 10.5859C11.367 9.80489 12.633 9.80489 13.4141 10.5859L17.4141 14.5859L17.5518 14.7373C18.1926 15.5229 18.1463 16.6818 17.4141 17.4141C16.6818 18.1463 15.5229 18.1926 14.7373 17.5518L14.5859 17.4141L10.5859 13.4141C9.80489 12.633 9.80489 11.367 10.5859 10.5859ZM1.00977 11C1.56205 11 2.00977 11.4477 2.00977 12C2.00977 12.5523 1.56205 13 1.00977 13H1C0.447715 13 0 12.5523 0 12C0 11.4477 0.447715 11 1 11H1.00977ZM23.0098 11C23.562 11 24.0098 11.4477 24.0098 12C24.0098 12.5523 23.562 13 23.0098 13H23C22.4477 13 22 12.5523 22 12C22 11.4477 22.4477 11 23 11H23.0098ZM3.51953 3.5127C3.88578 3.14645 4.46562 3.12363 4.8584 3.44434L4.93359 3.5127L4.94141 3.51953L5.00977 3.5957C5.32994 3.98834 5.30714 4.56748 4.94141 4.93359C4.55088 5.32412 3.91689 5.32412 3.52637 4.93359L3.51953 4.92676C3.12919 4.53626 3.12917 3.90318 3.51953 3.5127ZM19.0762 3.5127C19.4667 3.12221 20.0997 3.1222 20.4902 3.5127C20.8807 3.90321 20.8807 4.53623 20.4902 4.92676L20.4834 4.93359C20.0929 5.32413 19.4599 5.32411 19.0693 4.93359C18.6788 4.54308 18.6788 3.91006 19.0693 3.51953L19.0762 3.5127ZM12 0C12.5523 5.15403e-06 13 0.447718 13 1V1.00977C13 1.56205 12.5523 2.00976 12 2.00977C11.4477 2.00977 11 1.56205 11 1.00977V1C11 0.447715 11.4477 0 12 0Z" fill="url(#1752500502782-6773768_dial_existing_0_de45fjxad)" data-glass="clone" filter="url(#1752500502782-6773768_dial_filter_ptlik7nnh)" clip-path="url(#1752500502782-6773768_dial_clipPath_wdrys23hw)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12.7954 11.2046C12.3561 10.7653 11.6439 10.7653 11.2046 11.2046C10.7653 11.6439 10.7653 12.3561 11.2046 12.7954L15.1421 16.7329L15.2278 16.8098C15.6697 17.1702 16.321 17.1448 16.7329 16.7329C17.1448 16.321 17.1702 15.6697 16.8098 15.2278L16.7329 15.1421L12.7954 11.2046Z" fill="url(#1752500502782-6773768_dial_existing_1_yir1teo73)" data-glass="blur"></path><path d="M12 3C16.9706 3 21 7.02944 21 12C21 14.8278 19.695 17.3501 17.6553 19H16.3652C18.6976 17.5424 20.25 14.9531 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 14.9531 5.30238 17.5424 7.63477 19H6.34473C4.30501 17.3501 3 14.8278 3 12C3 7.02944 7.02944 3 12 3Z" fill="url(#1752500502782-6773768_dial_existing_2_yr21dlssj)"></path><defs><linearGradient id="1752500502782-6773768_dial_existing_0_de45fjxad" x1="12.005" y1="0" x2="12.005" y2="20.783" gradientUnits="userSpaceOnUse"><stop stop-color="#575757"></stop><stop offset="1" stop-color="#151515"></stop></linearGradient><linearGradient id="1752500502782-6773768_dial_existing_1_yir1teo73" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse"><stop stop-color="#E3E3E599"></stop><stop offset="1" stop-color="#BBBBC099"></stop></linearGradient><linearGradient id="1752500502782-6773768_dial_existing_2_yr21dlssj" x1="12" y1="3" x2="12" y2="15.5" gradientUnits="userSpaceOnUse"><stop stop-color="#fff" stop-opacity="1"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><filter id="1752500502782-6773768_dial_filter_ptlik7nnh" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter><clipPath id="1752500502782-6773768_dial_clipPath_wdrys23hw"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12.7954 11.2046C12.3561 10.7653 11.6439 10.7653 11.2046 11.2046C10.7653 11.6439 10.7653 12.3561 11.2046 12.7954L15.1421 16.7329L15.2278 16.8098C15.6697 17.1702 16.321 17.1448 16.7329 16.7329C17.1448 16.321 17.1702 15.6697 16.8098 15.2278L16.7329 15.1421L12.7954 11.2046Z" fill="url(#1752500502782-6773768_dial_existing_1_yir1teo73)"></path></clipPath><mask id="1752500502782-6773768_dial_mask_52ly7uclq"><rect width="100%" height="100%" fill="#FFF"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12.7954 11.2046C12.3561 10.7653 11.6439 10.7653 11.2046 11.2046C10.7653 11.6439 10.7653 12.3561 11.2046 12.7954L15.1421 16.7329L15.2278 16.8098C15.6697 17.1702 16.321 17.1448 16.7329 16.7329C17.1448 16.321 17.1702 15.6697 16.8098 15.2278L16.7329 15.1421L12.7954 11.2046Z" fill="#000"></path></mask></defs></g></svg>

                </i>
                <small class="font-weight-900">Gift Code</small>
            </div>
             <div x-on:click="Vitecss.navigate('{{ url('users/referrals') }}')" class="column border-width-1px border-style-solid border-color-rgt-01 bg-light p-10px br-10px box-shadow w-full g-10px align-center text-center">
               <i>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>users</title><g fill="none"><path d="M15.9414 10C19.8397 10.0001 22.9999 13.1603 23 17.0586C23 18.1307 22.1307 19 21.0586 19H9.94141C8.86932 19 8 18.1307 8 17.0586C8.00012 13.1603 11.1603 10.0001 15.0586 10H15.9414ZM15.5 1C17.433 1 19 2.567 19 4.5C19 6.433 17.433 8 15.5 8C13.567 8 12 6.433 12 4.5C12 2.567 13.567 1 15.5 1Z" fill="url(#1752500502811-1433248_users_existing_0_y95s6luwt)" data-glass="origin" mask="url(#1752500502811-1433248_users_mask_yf9omh5zt)"></path><path d="M15.9414 10C19.8397 10.0001 22.9999 13.1603 23 17.0586C23 18.1307 22.1307 19 21.0586 19H9.94141C8.86932 19 8 18.1307 8 17.0586C8.00012 13.1603 11.1603 10.0001 15.0586 10H15.9414ZM15.5 1C17.433 1 19 2.567 19 4.5C19 6.433 17.433 8 15.5 8C13.567 8 12 6.433 12 4.5C12 2.567 13.567 1 15.5 1Z" fill="url(#1752500502811-1433248_users_existing_0_y95s6luwt)" data-glass="clone" filter="url(#1752500502811-1433248_users_filter_3otwug04l)" clip-path="url(#1752500502811-1433248_users_clipPath_bg1gnmpmw)"></path><path d="M10.3076 12C14.556 12 18 15.444 18 19.6924C18 20.9668 16.9668 22 15.6924 22H4.30762C3.03317 22 2.00004 20.9668 2 19.6924C2 15.444 5.44404 12 9.69238 12H10.3076ZM10 2C12.2091 2 14 3.79086 14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2Z" fill="url(#1752500502811-1433248_users_existing_1_nqwjcp74f)" data-glass="blur"></path><path d="M13.25 6C13.25 4.20507 11.7949 2.75 10 2.75C8.20507 2.75 6.75 4.20507 6.75 6C6.75 7.79493 8.20507 9.25 10 9.25V10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6C14 8.20914 12.2091 10 10 10V9.25C11.7949 9.25 13.25 7.79493 13.25 6Z" fill="url(#1752500502811-1433248_users_existing_2_wnwbkzqj7)"></path><path d="M15.6924 21.25V22H4.30762V21.25H15.6924ZM17.25 19.6924C17.25 15.8583 14.1417 12.75 10.3076 12.75H9.69238C5.85825 12.75 2.75 15.8583 2.75 19.6924C2.75004 20.5526 3.44739 21.25 4.30762 21.25V22C3.11295 22 2.13009 21.0921 2.01172 19.9287L2 19.6924C2 15.5767 5.23229 12.2156 9.29688 12.0098L9.69238 12H10.3076C14.556 12 18 15.444 18 19.6924L17.9883 19.9287C17.8778 21.0145 17.0145 21.8778 15.9287 21.9883L15.6924 22V21.25C16.5526 21.25 17.25 20.5526 17.25 19.6924Z" fill="url(#1752500502811-1433248_users_existing_3_let3hcao2)"></path><defs><linearGradient id="1752500502811-1433248_users_existing_0_y95s6luwt" x1="15.5" y1="1" x2="15.5" y2="19" gradientUnits="userSpaceOnUse"><stop stop-color="#575757"></stop><stop offset="1" stop-color="#151515"></stop></linearGradient><linearGradient id="1752500502811-1433248_users_existing_1_nqwjcp74f" x1="10" y1="2" x2="10" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="#E3E3E599"></stop><stop offset="1" stop-color="#BBBBC099"></stop></linearGradient><linearGradient id="1752500502811-1433248_users_existing_2_wnwbkzqj7" x1="10" y1="2" x2="10" y2="6.633" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><linearGradient id="1752500502811-1433248_users_existing_3_let3hcao2" x1="10" y1="12" x2="10" y2="17.791" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><filter id="1752500502811-1433248_users_filter_3otwug04l" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter><clipPath id="1752500502811-1433248_users_clipPath_bg1gnmpmw"><path d="M10.3076 12C14.556 12 18 15.444 18 19.6924C18 20.9668 16.9668 22 15.6924 22H4.30762C3.03317 22 2.00004 20.9668 2 19.6924C2 15.444 5.44404 12 9.69238 12H10.3076ZM10 2C12.2091 2 14 3.79086 14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2Z" fill="url(#1752500502811-1433248_users_existing_1_nqwjcp74f)"></path></clipPath><mask id="1752500502811-1433248_users_mask_yf9omh5zt"><rect width="100%" height="100%" fill="#FFF"></rect><path d="M10.3076 12C14.556 12 18 15.444 18 19.6924C18 20.9668 16.9668 22 15.6924 22H4.30762C3.03317 22 2.00004 20.9668 2 19.6924C2 15.444 5.44404 12 9.69238 12H10.3076ZM10 2C12.2091 2 14 3.79086 14 6C14 8.20914 12.2091 10 10 10C7.79086 10 6 8.20914 6 6C6 3.79086 7.79086 2 10 2Z" fill="#000"></path></mask></defs></g></svg>

                </i>
                <small class="font-weight-900">My Team</small>
            </div>
            
        </div>
      

        {{-- group --}}
        <section class="w-full column g-10">
     
     
       {{-- packages loop --}}
        @if ($packages->isEmpty())
            @include('components.utilities',[
                'empty' => true,
                'data' => $packages
            ])
        @else
        
        
            <strong class="desc font-weight-900 m-top-10">Product List</strong>
        <div class="grid pc-grid-2 g-20 w-full">
         @foreach ($packages as $data)
          <div style="overflow-x: hidden" class="w-full h-fit column bg-light box-shadow br-5 p-15px g-10">
            {{-- new row --}}
            <div class="row w-full h-auto g-10">
                <div class="h-full br-5px w-100px bg-primary-01">
                    <img src="{{ asset('packages/'.$data->photo.'') }}" alt="" class="w-full no-pointer no-select max-h-full br-inherit h-full">
                </div>
                {{-- new --}}
                <div class="column flex-auto overflow-hidden g-10px">
                    <div class="row align-center g-10 space-between w-full">
                    <strong class="font-weight-800 uppercase">{{ $data->name }}</strong>
                    <div class="p-5 p-x-10px bg-primary primary-text font-size-05 br-5 no-select font-weight-900">{{ number_format($data->validity) }} days</div>
                    </div>
                    {{-- new row --}}
                    <div class="row w-full align-center g-10px space-between">
                        <span class="opacity-08">Investment</span>
                        <strong class="font-weight-900 w-fit text-overflow-ellipsis c-primary-dark font-size-1">{{ $CurrencyHelper::format($data->cost,'NGN',Auth::guard('users')->user()->display_currency) }}</strong>
                    </div>
                    {{-- new row --}}

                    <div class="row w-full g-10px">
                        <div style="width:clamp(30%,100%,50%);" class="column w-full bg-rgt-005 br-5px p-10px g-2px align-center">
                            <small class="opacity-07">Daily Income</small>
                            <strong class="font-weight-900 break-word font-size-07 ws-nowrap">{{ $CurrencyHelper::format($data->earning,'NGN',Auth::guard('users')->user()->display_currency) }}</strong>
                        </div>
                          <div style="width:clamp(30%,100%,50%);" class="column w-full bg-rgt-005 br-5px p-10px g-2px align-center">
                            <small class="opacity-07">Total Income</small>
                            <strong class="font-weight-900 font-size-07 break-word ws-nowrap">{{ $CurrencyHelper::format($data->earning * $data->validity,'NGN',Auth::guard('users')->user()->display_currency) }}</strong>
                        </div>
                    </div>
                    <div x-on:click="
                    Overlay = true;
                    Package.ID = '{{ $data->id }}';
                    Package.Name='{{ $data->name }}';
                    Package.Cost='{{ $CurrencyHelper::format($data->cost,'NGN',Auth::guard('users')->user()->display_currency) }}';
                    Package.DailyIncome='{{ $CurrencyHelper::format($data->earning,'NGN',Auth::guard('users')->user()->display_currency) }}';
                    Package.Cycle='{{ number_format($data->validity) }} Days';
                    Package.TotalIncome='{{ $CurrencyHelper::format($data->earning*$data->validity,'NGN',Auth::guard('users')->user()->display_currency) }}';
                    " class="p-5 p-x-10px secondary-text row align-center justify-center br-5px bg-secondary no-select pointer">Invest</div>
                </div>
            </div>
           
          </div>
        @endforeach
       </div>


        @endif

        </section>
       </section>
     
        
       
       

        {{-- overlay --}}
<section x-on:click="Overlay=false;" x-transition:enter-start="fade-enter" x-transition:enter-end="fade-enter-end" x-transition:leave-start="fade-leave" x-transition:leave-end="fade-leave-end" x-show="Overlay" class="pos-fixed transition-all column inset-0 bg-black-transparent z-index-4000 backdrop-blur-10px">
{{-- child --}}
<div x-show="Overlay" x-transition:enter-start="bottom-enter" x-transition:enter-end="bottom-enter-end" x-transition:leave-start="bottom-leave" x-transition:leave-end="bottom-leave-end" x-on:click.stop="" style="max-height:95%" class="child transition-all m-top-auto bg-light w-full max-w-500px br-top-left-15px br-top-right-15px column p-20px g-10px">
{{-- new row --}}
<div class="row align-center space-between w-full pos-sticky top-0">
    <strong class="font-weight-900 font-size-1-3rem">Confirm Investment</strong>
    <div x-on:click="Overlay=false;" class="h-30px w-30px perfect-square no-shrink circle bg-rgt-01 column align-center justify-center">
        <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>

    </div>
</div>
{{-- main --}}
<div class="w-full m-top-30px column g-10px">
    {{-- new row --}}
    <div class="row w-full font-weight-700 align-center space-between">
        <span class="opacity-07">Package Name</span>
        <span x-html="Package.Name" class="uppercase"></span>
    </div>
    {{-- new row --}}
    <div class="row w-full font-weight-700 align-center space-between">
        <span class="opacity-07">Package Cost</span>
        <span x-html="Package.Cost" class="uppercase"></span>
    </div>
      {{-- new row --}}
    <div class="row w-full font-weight-700 align-center space-between">
        <span class="opacity-07">Daily Income</span>
        <span x-html="Package.DailyIncome" class="uppercase"></span>
    </div>
      {{-- new row --}}
    <div class="row w-full font-weight-700 align-center space-between">
        <span class="opacity-07">Total Income</span>
        <span x-html="Package.TotalIncome" class="uppercase"></span>
    </div>
      {{-- new row --}}
    <div class="row w-full font-weight-700 align-center space-between">
        <span class="opacity-07">Cycle</span>
        <span x-html="Package.Cycle" class="uppercase"></span>
    </div>
    <div class="w-full m-top-30px p-10px br-10px border-width-1px border-style-solid border-color-rgt-01 row align-center space-between">
        <span class="opacity-07">Available Balance</span>
        <strong class="font-size-1 font-weight-900">{{ $deposit_balance }}</strong>
    </div>
    <div class="hr" vitecss-type="dashed"></div>
    <button x-data="{ 
        Submitting : false
     }" x-on:click="
     Submitting = true;
     $el.classList.add('disabled');
     SendPostRequest('{{ url('users/post/purchase/package/process') }}',{
        'id' : Package.ID,
        '_token' : '{{ @csrf_token() }}'
     },function(response,error){
        let data=JSON.parse(response);
        CreateNotify(data.status,data.message);
        Submitting = false;
        $el.classList.remove('disabled');
      if(data.status == 'success'){
        Overlay = false;
        Vitecss.navigate('{{ url('users/products/active') }}')
      }

     })
     " class="w-full bg-secondary secondary-text border-none box-shadow font-weight-900 p-15px br-1000px">
      <span x-show="!Submitting">INVEST NOW</span>
       <span x-show="Submitting">INVESTING...</span>
    </button>
</div>
</div>
</section>
    </section>


@endsection
