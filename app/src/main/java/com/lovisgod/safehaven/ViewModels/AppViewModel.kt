package com.lovisgod.safehaven.ViewModels

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.liveData
import com.lovisgod.safehaven.Models.Login
import com.lovisgod.safehaven.Models.SignUp
import com.lovisgod.safehaven.Repository.AppRepo
import kotlinx.coroutines.Dispatchers
import org.greenrobot.eventbus.EventBus

class AppViewModel: ViewModel() {
    fun login(details: Login) =
        liveData(Dispatchers.IO) {
            try {
                val loginResponse = AppRepo.login(details = details)
                emit(loginResponse)
            } catch (e: Exception) {
                Log.d("TAG", "error -> ${e.localizedMessage}")
                if (e.message!!.contains("Unable to resolve host")) {
                    Log.i("errorrr", "error -> ${e}")
//                    EventBus.getDefault().post(NetworkErrorEvent("A network error occured please check your network and try again later"))
                } else {

//                    val errorResponse = LoginResponse(data = e.localizedMessage, status = "Error")
//                    emit(errorResponse)
                }
            }

        }

    fun signUp(signupDetails: SignUp) =
        liveData(Dispatchers.IO) {
            try {
                val signupResponse = AppRepo.signup(details = signupDetails)
                emit(signupResponse)
            } catch (e: Exception) {
                Log.d("TAG", "error -> ${e.localizedMessage}")
                if (e.message!!.contains("Unable to resolve host")) {
                    Log.i("errorrr", "error -> ${e}")
//                    EventBus.getDefault().post(NetworkErrorEvent("A network error occured please check your network and try again later"))
                }
            }
        }
}