package com.lovisgod.safehaven.ViewModels

import android.content.Context
import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.liveData
import com.location.aravind.getlocation.GeoLocator
import com.lovisgod.safehaven.Models.*
import com.lovisgod.safehaven.Repository.AppRepo
import com.lovisgod.safehaven.Utils.Geocode
import com.pixplicity.easyprefs.library.Prefs
import kotlinx.coroutines.Dispatchers
import org.greenrobot.eventbus.EventBus

class AppViewModel: ViewModel() {
    var geocode = Geocode()
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
    fun sosAlert(details: Alert) =
        liveData(Dispatchers.IO) {
            try {
                val token = Prefs.getString("token", "")
                val sosResponse = AppRepo.sendSos(details, token)
                emit(sosResponse)
            } catch (e: Exception){
                if (e.message!!.contains("Unable to resolve host")) {
                    Log.i("errorrr", "error -> ${e}")
                    EventBus.getDefault().post(NetworkErrorEvent("A network error occured please check your network and try again later"))
                }
            }
        }

    fun policeAlert(details: OtherAlerts) =
        liveData(Dispatchers.IO) {
            try {
                val token = Prefs.getString("token", "")
                val sosResponse = AppRepo.sendPolice(details, token)
                Log.i("resposne", "this is response -> ${sosResponse.data}")
                emit(sosResponse)
            } catch (e: Exception){
                if (e.message!!.contains("Unable to resolve host")) {
                    Log.i("errorrr", "error -> ${e}")
                    EventBus.getDefault().post(NetworkErrorEvent("A network error occured please check your network and try again later"))
                }
            }
        }
    fun hospitalAlert(details: OtherAlerts) =
        liveData(Dispatchers.IO) {
            try {
                val token = Prefs.getString("token", "")
                val sosResponse = AppRepo.sendHospital(details, token)
                emit(sosResponse)
            } catch (e: Exception){
                if (e.message!!.contains("Unable to resolve host")) {
                    Log.i("errorrr", "error -> ${e}")
                    EventBus.getDefault().post(NetworkErrorEvent("A network error occured please check your network and try again later"))
                }
            }
        }
    fun lawyerAlert(details: OtherAlerts) =
        liveData(Dispatchers.IO) {
            try {
                val token = Prefs.getString("token", "")
                val sosResponse = AppRepo.sendLawyer(details, token)
                emit(sosResponse)
            } catch (e: Exception){
                if (e.message!!.contains("Unable to resolve host")) {
                    Log.i("errorrr", "error -> ${e}")
                    EventBus.getDefault().post(NetworkErrorEvent("A network error occured please check your network and try again later"))
                }
            }
        }
    fun getlocation (geoLocator: GeoLocator, context: Context) =
            liveData(Dispatchers.IO) {
                try {
                    var address = ""
                    val long = geoLocator.longitude
                    val latt = geoLocator.lattitude
                    val coordinate = "$long, $latt"
                     address = geocode.getAddress(latt, long, context)!!
                    val location = Location(coordinate, address)
                    emit(location)
                } catch (e: Exception) {
                    Log.i("locationError", "${e.localizedMessage}")
                }
            }
}