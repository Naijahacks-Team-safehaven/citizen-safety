package com.lovisgod.safehaven

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ProgressBar
import android.widget.TextView
import com.google.android.material.textfield.TextInputEditText

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        val emailText = findViewById<TextInputEditText>(R.id.reg_em)
        val passwordText = findViewById<TextInputEditText>(R.id.reg_pass)
        val submit = findViewById<Button>(R.id.login_button)
        val progressBar: ProgressBar = findViewById(R.id.login_progress_bar)
        val signup = findViewById<TextView>(R.id.signup_text_link)

        signup.setOnClickListener {
            val intent = Intent(this, SignupActivity::class.java)
            startActivity(intent)
        }

    }
}
