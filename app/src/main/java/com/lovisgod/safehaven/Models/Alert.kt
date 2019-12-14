package com.lovisgod.safehaven.Models

 data class Alert(var location : String)


 data class OtherAlerts(
     var proof: String,
     var details: String,
     var address: String,
     var location: String
 )