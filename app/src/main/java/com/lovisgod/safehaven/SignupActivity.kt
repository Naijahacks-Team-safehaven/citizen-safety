package com.lovisgod.safehaven

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.lovisgod.safehaven.Models.SignUp
import com.lovisgod.safehaven.Utils.DailogMessages
import com.lovisgod.safehaven.ViewModels.AppViewModel
import com.pixplicity.easyprefs.library.Prefs

class SignupActivity : AppCompatActivity() {
    var messages = DailogMessages()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)
        var email: EditText = findViewById(R.id.email)
        var name: EditText = findViewById(R.id.name)
        var phone: EditText = findViewById(R.id.phone)
        var haven: EditText = findViewById(R.id.haven)
        var password: EditText = findViewById(R.id.password)
        var signUpButton: Button = findViewById(R.id.signup_button)

        var model = ViewModelProviders.of(this)[AppViewModel::class.java]
        signUpButton.setOnClickListener {
            var dailog = messages.loading("Please wait while we register your details", this)
            dailog!!.show()
            val emailString = email.text.toString()
            val nameString = name.text.toString()
            val phoneString = phone.text.toString()
            val havenString = haven.text.toString()
            val passwordString = password.text.toString()

            val signupDetails: SignUp = SignUp(nameString, emailString, passwordString, havenString, "", phoneString)
            model.signUp(signupDetails = signupDetails).observe(this, Observer {
                Log.d("Signup" , "details -> ${it}")
                if (it.status.equals("Success")){
                    dailog.dismiss()
                    val intent = Intent(this, LoginActivity::class.java)
                    startActivity(intent)
                    finish()
                } else {
                    dailog.dismiss()
                    messages.getMessage("Signup not successful please try again or contact safehave customer care", this)
                }

            })
        }
    }
}
