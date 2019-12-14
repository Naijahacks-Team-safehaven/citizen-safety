package com.lovisgod.safehaven.Models

data class Login (
    var email: String,
    var password: String
)

data class LoginResponse (
    var status: String,
    var data: String
)