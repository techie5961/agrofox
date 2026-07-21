@extends('layout.users.app')
@section('title')
    Active Products
@endsection

@section('main')
    <section class="w-full column g-10">
       <section class="column w-full g-10px">
            <div class="row w-full g-10 align-center space-between">
               <i onclick="Redirect('{{ url()->previous() }}')" class="h-40px w-40px no-shrink no-select pointer circle bg-secondary secondary-text column align-center justify-center box-shadow">

                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                </i>
                <span class="font-weight-900 block font-1">My Orders</span>
                <span onclick="Redirect('{{ url('users/transactions') }}')">
                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="25" width="25"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path></svg>

                </span>
           
            </div>
            <div class="w-full border-bottom-width-2px border-bottom-style-solid border-bottom-color-primary-light box-shadow bg-primary primary-text max-w-500 m-x-auto br-10 p-20 column g-10">
                <strong class="desc font-weight-900">{{ $CurrencyHelper::format($income,'NGN',$display_currency) }}</strong>
                <span class="opacity-07">Total Daily Income</span>
            </div>
        </section>
       <div class="w-full column g-10">
        <span class="cd"></span>
        @if ($packages->isEmpty())
            @include('components.utilities',[
              'empty' => 'true',
              'text' => 'No package purchased'
            ])
        @else
        <section class="w-full g-10 place-center grid responsive-grid-200px">
              @foreach ($packages as $data)
                 <div class="w-full p-15px box-shadow column bg-light br-5 g-10">
            {{-- new --}}
           {{-- new row --}}
            <div class="row align-center w-full h-auto g-10">
               
                {{-- new column --}}
                <div class="column">
               <strong class="font-size-1 font-weight-900">{{ $data->package->name }}</strong>
               <small class="opacity-07">Purchased {{ $data->frame }}</small>

                </div>
            </div>
               {{-- new row --}}
               {{-- new row --}}
               <div class="row w-full align-center space-between">
                <span class="opacity-07">Investment Cycle</span>
                <span>{{ number_format($data->package->validity) }} Days</span>
               </div>
               {{-- new row --}}
               <div class="row w-full align-center space-between">
                <span class="opacity-07">Purchase Price</span>
                <span>{{ $CurrencyHelper::format($data->package->cost,'NGN',$display_currency) }}</span>
               </div>
 {{-- new row --}}
               <div class="row w-full align-center space-between">
                <span class="opacity-07">Daily Payout</span>
                <span>{{ $CurrencyHelper::format($data->package->earning,'NGN',$display_currency) }}</span>
               </div>
               {{-- new row --}}
               <div class="row w-full align-center space-between">
                <span class="opacity-07">Settlement Method</span>
                <span>Daily Repayment</span>
               </div>
               {{-- new row --}}
               <div class="row w-full align-center space-between">
                <span class="opacity-07">Investment Status</span>
               <div style="background:#4caf50;" class="p-5px p-x-10px br-5px bg-whatsapp c-white">In Progress</div>
               </div>
               {{-- new --}}
               <div class="column w-full g-2">
                <div class="roow w-full align-center space-between">
                  {{-- new row --}}
               <div class="row w-full align-center space-between">
                <span class="opacity-07">Product Progress</span>
                <span>{{ round((($data->package->validity - $data->cycle)/$data->package->validity)*100) }}%</span>
               </div>
                </div>
  <div style="background:var(--rgt-005)" class="w-full br-1000 h-5 overflow-hidden">
                <div style="background:#4caf50;width:{{ (($data->package->validity - $data->cycle)/$data->package->validity)*100 }}%;" class="w-full br-1000 h-full"></div>
               </div>
               </div>
             
               {{-- new row --}}
               <div class="w-full font-weight-900 br-5px countdown row min-h-40 align-center justify-center bg-secondary no-select no-pointer secondary-text">
                <span>Next Income:</span>
                <span>{{ $data->next }}</span>
               </div>
        </div>
            @endforeach
        </section>
        
        @endif
       </div>
    </section>

    
@endsection
@section('js')
   
@endsection