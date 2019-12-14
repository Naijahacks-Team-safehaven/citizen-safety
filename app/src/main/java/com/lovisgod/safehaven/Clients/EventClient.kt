package com.lovisgod.safehaven.Clients

import com.lovisgod.safehaven.Models.*
import okhttp3.ResponseBody
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface EventClient {
    @POST("web/signup")
    suspend fun signup(@Body signUpDetails:SignUp): LoginResponse

    @POST("web/login")
    suspend fun login(@Body loginDetails: Login) : LoginResponse

    @POST("web/send-sos")
    suspend fun sensSos(@Body details: Alert, @Header("Authorization") token: String) : LoginResponse

    @POST("web/report-police")
    suspend fun SendPoliceAlert(@Body details: OtherAlerts, @Header("Authorization") token: String): LoginResponse

    @POST("web/report-hospital")
    suspend fun SendHospitalAlert(@Body details: OtherAlerts, @Header("Authorization") token: String) : LoginResponse

    @POST("web/report-lawyer")
    suspend fun SendLawyerAlert(@Body details: OtherAlerts, @Header("Authorization") token: String): LoginResponse



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