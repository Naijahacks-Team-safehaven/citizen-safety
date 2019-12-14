package com.lovisgod.safehaven.Repository

import com.lovisgod.safehaven.Clients.EventClient
import com.lovisgod.safehaven.Models.Alert
import com.lovisgod.safehaven.Models.Login
import com.lovisgod.safehaven.Models.OtherAlerts
import com.lovisgod.safehaven.Models.SignUp

class AppRepo {
    companion object Provider {
        private  val client = EventClient.create()
        suspend fun signup(details: SignUp) = client.signup(signUpDetails = details)
        suspend fun login(details: Login) = client.login(details)
        suspend fun sendSos(details: Alert, token: String) = client.sensSos(details, token)
        suspend fun sendPolice(details: OtherAlerts, token: String) = client.SendPoliceAlert(details, token)
        suspend fun sendHospital(details: OtherAlerts, token: String) = client.SendHospitalAlert(details, token)
        suspend fun sendLawyer(details: OtherAlerts, token: String) = client.SendLawyerAlert(details, token)
    }
}