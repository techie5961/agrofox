<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UserGetRequestController extends Controller
{
    // switch currency
    public function SwitchCurrency(){
       DB::table('users')->where('id',Auth::guard('users')->user()->id)->update([
        'display_currency' => request('currency')
       ]);
       return redirect('users/dashboard');
    }
}
