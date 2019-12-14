package com.lovisgod.safehaven.Clients

import com.lovisgod.safehaven.Models.Alert
import com.lovisgod.safehaven.Models.Login
import com.lovisgod.safehaven.Models.OtherAlerts
import com.lovisgod.safehaven.Models.SignUp
import okhttp3.ResponseBody
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface EventClient {
    @POST("web/signup")
    suspend fun signup(@Body signUpDetails:SignUp): ResponseBody

    @POST("web/login")
    suspend fun login(@Body loginDetails: Login) : ResponseBody

    @POST("web/send-sos")
    suspend fun sensSos(@Body details: Alert, @Header("Authorization") token: String) : ResponseBody

    @POST("web/report-police")
    suspend fun SendPoliceAlert(@Body details: OtherAlerts, @Header("Authorization") token: String): ResponseBody

    @POST("web/report-hospital")
    suspend fun SendHospitalAlert(@Body details: OtherAlerts, @Header("Authorization") token: String) : ResponseBody

    @POST("web/report-lawyer")
    suspend fun SendLawyerAlert(@Body details: OtherAlerts, @Header("Authorization") token: String): ResponseBody



    companion object Factory {
        fun create(): EventClient {
            val retrofit = Retrofit.Builder()
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl("https://safehavenng.herokuapp.com/api/v1/")
                .build()

            return retrofit.create(EventClient::class.java)
        }
    }
}