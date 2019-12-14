package com.lovisgod.safehaven

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.ProgressBar
import android.widget.TextView
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.google.android.material.textfield.TextInputEditText
import com.lovisgod.safehaven.Models.Login
import com.lovisgod.safehaven.Models.NetworkErrorEvent
import com.lovisgod.safehaven.Utils.DailogMessages
import com.lovisgod.safehaven.ViewModels.AppViewModel
import com.pixplicity.easyprefs.library.Prefs
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe
import org.greenrobot.eventbus.ThreadMode

class LoginActivity : AppCompatActivity() {
    var messages = DailogMessages()
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        val emailText = findViewById<TextInputEditText>(R.id.reg_em)
        val passwordText = findViewById<TextInputEditText>(R.id.reg_pass)
        val submit = findViewById<Button>(R.id.login_button)
        progressBar = findViewById(R.id.login_progress_bar)
        val signup = findViewById<TextView>(R.id.signup_text_link)
        var model = ViewModelProviders.of(this)[AppViewModel::class.java]

        signup.setOnClickListener {
            val intent = Intent(this, SignupActivity::class.java)
            startActivity(intent)
        }

        if (Prefs.getString("token", "").isNotEmpty()){
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
        }

        submit.setOnClickListener {
            progressBar.visibility = View.VISIBLE
            val email = emailText.text.toString()
            val password = passwordText.text.toString()
            val details: Login = Login(email,password)
            model.login(details).observe(this, Observer {
                Log.d("Login", "details -> ${it}")
                if (it.status == "Success"){
                    Prefs.putString("token", it.data)
                    progressBar.visibility = View.GONE
                    val intent = Intent(this, MainActivity::class.java)
                    startActivity(intent)
                    finish()
                } else {
                    messages.getMessage("Login not successful please try again or contact safehave customer care", this)
                }

            })
        }
    }


    @Subscribe(threadMode = ThreadMode.MAIN)
    fun onNetworkErrorEvent(event: NetworkErrorEvent) {
        messages.getMessage(event.message, this)
        progressBar.visibility = View.GONE
    }

    override fun onStart() {
        super.onStart()
        EventBus.getDefault().register(this)
    }

    override fun onStop() {
        EventBus.getDefault().unregister(this)
        super.onStop()
    }
}
