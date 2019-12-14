package com.lovisgod.safehaven

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText

class SignupActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)
        var email: EditText = findViewById(R.id.email)
        var name: EditText = findViewById(R.id.name)
        var phone: EditText = findViewById(R.id.phone)
        var haven: EditText = findViewById(R.id.haven)
        var passeord: EditText = findViewById(R.id.password)
        var signUpButton: Button = findViewById(R.id.signup_button)


    }
}
