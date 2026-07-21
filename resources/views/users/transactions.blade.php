@extends('layout.users.app')
@section('title')
    Transaction History
@endsection

@section('main')
    <section class="w-full g-10px column">
       <section class="column w-full g-10px">
            <div class="row w-full g-10 align-center space-between">
               <i onclick="Redirect('{{ url()->previous() }}')" class="h-40px w-40px no-shrink no-select pointer circle bg-secondary secondary-text column align-center justify-center box-shadow">

                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                </i>
                <span class="font-weight-900 block font-1">Transactions</span>
                <span onclick="Redirect('{{ url('users/transactions') }}')">
                    <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="25" width="25"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path></svg>

                </span>
           
            </div>
            <div class="w-full border-bottom-width-2px border-bottom-style-solid border-bottom-color-primary-light box-shadow bg-primary primary-text max-w-500 m-x-auto br-10 p-20 column g-10">
                <strong class="desc font-weight-900">{{ number_format($total) }}</strong>
                <span class="opacity-07">Total Transactions</span>
            </div>
        </section>
        {{-- new section /body --}}
        <section class="section column g-10px w-full body">
        
            @if ($trx->isEmpty())
                @include('components.utilities',[
                    'empty' => true,
                    'text' => 'No Transaction Found'
                ])
            @else
                <div class="w-full pc-grid-3 g-10 place-center grid">
                    @foreach ($trx as $data)
                        <div style="box-shadow: 0 0 10px rgba(0,0,0,0.1)" class="w-full g-10 column g-10 br-10 p-20 bg-light">
                            {{-- new row --}}
                            <div style="border-bottom:1px solid var(--rgt-01);padding-bottom:10px;" class="row w-full g-10 align-center space-between">
                               {{-- new column --}}
                                <div class="column g-5">
                                    <small class="opacity-07">Transaction ID</small>
                                    <span class=" font-size-09">{{ $data->uniqid }}</span>
                                </div>
                                 {{-- new column --}}
                                <div class="column text-end g-5">
                                    <small class="opacity-07">Amount</small>
                                    <span class="font-weight-900 font-size-1 {{ $data->class == 'credit' ? 'c-green': 'c-red' }}">{{ $data->class == 'credit' ? '+' : '-' }}{{ $CurrencyHelper::format($data->amount,'NGN',$display_currency) }}</span>
                                </div>
                            </div>
                             {{-- new row --}}
                            <div style="border-bottom:1px solid var(--rgt-01);padding-bottom:10px;" class="row w-full g-10 align-center space-between">
                               {{-- new column --}}
                                <div class="row opacity-07 align-center g-5">
                                        <svg viewBox="0 0 24 24" fill="CurrentColor" xmlns="http://www.w3.org/2000/svg" height="15" width="15"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg>

                                    <span>{{ $data->frame }}</span>
                                </div>
                                 {{-- new column --}}
                                <div class="column g-5">
                                    <div class="status {{ $data->status == 'success' ? 'green' : ($data->status == 'pending' ? 'gold' : ($data->status == 'rejected' || $data->status == 'failed' ? 'red' : 'status-info')) }}">{{ $data->status }}</div>
                                </div>
                            </div>
                             {{-- new row --}}
                            <div class="row w-full g-10 align-center space-between">
                               {{ $data->title }}
                            </div>
                        </div>
                    @endforeach
                </div>

                @if ($trx->lastPage() > 1)
                    @include('components.utilities',[
                        'data' => $trx,
                        'paginate' => true
                    ])
                @endif
            @endif
        </section>
    </section>
@endsection