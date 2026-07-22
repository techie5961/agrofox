<!DOCTYPE html>
<html lang="en">
<head>
    {{-- include meta tags --}}
   @include('components.utilities',[
    'meta_tags' => true
   ])
{{-- include favicon --}}
@include('components.utilities',[
    'favicon' => true
])
{{-- include vite css --}}
@include('components.utilities',[
    'vite_css' => true
])
      @include('components.utilities',[
    'vite_js' => true
  ])
  <script>
    function Redirect(url,element=false){
        if(element){
            element.classList.add('animate');

            element.addEventListener('animationend',()=>{
                element.classList.remove('animate');
            })
        }
       Vitecss.navigate(url);
    }
    window.addEventListener('load',()=>{
        document.body.style.paddingBottom=document.querySelector('footer').offsetHeight + 'px';
    })
  </script>
    <title>{{ config('app.name') }} || Users || @yield('title') </title>
    <style>
        main{
            background:var(--bg);
        }
        section.title{
            color:var(--primary-text);
        }
      
       
         .back-icon{
         height:40px;
         width:40px;
         background:rgba(0,0,0,0.1);
         border-radius:50%;
         display:flex;
         align-items:center;
         justify-content: center;
         position:relative;
         }
                .back-icon::before{
                    padding: 1px;
                    content:'';
                    position:absolute;
                    inset:0;
                    border-radius:inherit;
                    background:linear-gradient(to bottom right,rgba(255,255,255,0.5),transparent,rgba(255,255,255,0.5));
                    mask:linear-gradient(white 0,white 0) content-box,linear-gradient(white 0,white 0);
                    -webkit-mask:linear-gradient(white 0,white 0) content-box,linear-gradient(white 0,white 0);
                    mask-composite:exclude;
                    -webkit-mask-composite:xor;
                }
        
     
        @media(min-width:800px){
            footer,main,header{
                padding-left:15vw;
                padding-right:15vw;
            }
        }
       
    </style>

    {{-- yield css --}}
     @yield('css')
     {{-- stack css --}}
     @stack('css')
</head>
<body>
    {{-- include action loader for post requests,get requests and spa loading --}}
    @include('components.utilities',[
        'action_loader' => true
    ])  
{{-- include general codes --}}
    @include('components.utilities',[
        'general_codes' => true
    ])
    <header>
      
       
    </header>
    <main>
        
        {{-- yield main --}}
        @yield('main')
    </main>
    <footer class="bg-light border-top-width-1px border-top-color-rgt-01 border-top-style-solid pos-fixed bottom-0 left-0 right-0 row g-10px align-center space-between">
        {{-- new nav link --}}
        <div onclick="Redirect('{{ url('users/dashboard') }}',this)" class="column opacity-07 p-10px align-center w-full {{ url()->current() == url('users/dashboard') ? 'c-secondary opacity-1 border-top-width-3px border-top-style-solid border-top-color-secondary' : '' }} g-5">
            <span>
<svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M13 19H19V9.97815L12 4.53371L5 9.97815V19H11V13H13V19ZM21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20Z"></path></svg>

            </span>
            <small>Home</small>
        </div>
          {{-- new nav link --}}
        <div onclick="Redirect('{{ url('users/products/active') }}',this)" class="column opacity-07 p-10px align-center w-full {{ url()->current() == url('users/products/active') ? 'c-secondary opacity-1 border-top-width-3px border-top-style-solid border-top-color-secondary' : '' }} g-5">
            <span>
<svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M20 3L22 7V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7.00353L4 3H20ZM20 9H4V19H20V9ZM13 10V14H16L12 18L8 14H11V10H13ZM18.7639 5H5.23656L4.23744 7H19.7639L18.7639 5Z"></path></svg>

            </span>
            <small>Orders</small>
        </div>
         {{-- new nav link --}}
        <div onclick="Redirect('{{ url('users/salary') }}',this)" class="column opacity-07 p-10px align-center w-full {{ url()->current() == url('users/transactions') ? 'c-secondary opacity-1 border-top-width-3px border-top-style-solid border-top-color-secondary' : '' }} g-5">
            <span>
<svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM17.4571 9.45711L16.0429 8.04289L11 13.0858L8.20711 10.2929L6.79289 11.7071L11 15.9142L17.4571 9.45711Z"></path></svg>
            </span>
            <small>Salary</small>
        </div>
          {{-- new nav link --}}
        <div onclick="Redirect('{{ url('users/invite') }}',this)" class="column align-center opacity-07 p-10px w-full {{ url()->current() == url('users/invite') ? 'c-secondary opacity-1 border-top-width-3px border-top-style-solid border-top-color-secondary' : '' }} g-5">
            <span>
<svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"></path></svg>

            </span>
            <small>Share</small>
        </div>
          {{-- new nav link --}}
        <div onclick="Redirect('{{ url('users/profile') }}',this)" class="column align-center opacity-07 p-10px w-full {{ url()->current() == url('users/profile') ? 'c-secondary opacity-1 border-top-width-3px border-top-style-solid border-top-color-secondary' : '' }} g-5">
            <span>
<svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>

</span>
            <small>Profile</small>
        </div>
    </footer>
  {{-- yield js --}}
    @yield('js')
    {{-- stack js --}}
    @stack('js')
    
</body>
</html>