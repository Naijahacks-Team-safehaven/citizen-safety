package com.lovisgod.safehaven

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Switch
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.core.app.ActivityCompat
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.location.aravind.getlocation.GeoLocator
import com.lovisgod.safehaven.Models.NetworkErrorEvent
import com.lovisgod.safehaven.Models.OtherAlerts
import com.lovisgod.safehaven.Utils.DailogMessages
import com.lovisgod.safehaven.ViewModels.AppViewModel
import com.pixplicity.easyprefs.library.Prefs
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe
import org.greenrobot.eventbus.ThreadMode

class EventActivity : AppCompatActivity() {
    var messages = DailogMessages()
    var location = ""
    var address = ""

    private lateinit var dailog: android.app.AlertDialog
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_event)
//        val geoLocator = GeoLocator(applicationContext, this)
        val geoLocator = GeoLocator(this, this)
        var contact_personnel: TextView = findViewById(R.id.contact_personnel)
        var event_box: TextView = findViewById(R.id.event_box)
        var locationEnabler: Switch = findViewById(R.id.location_swith)
        var send_button: Button = findViewById(R.id.send_button)
        var event = Prefs.getString("event", "")
        var model = ViewModelProviders.of(this)[AppViewModel::class.java]

        model.getlocation(geoLocator, this).observe(this, Observer {
            Log.i("location", "${it.corrdinate}, ${it.address}")
            address = it.address
            location = it.corrdinate
        })
        send_button.setOnClickListener {
            val eventMessage = event_box.text.toString()
            eventSender(eventMessage, event, model)
        }

        contact_personnel.text = "Contact $event"

    }

    fun eventSender(message: String, event: String, model: AppViewModel) {
        val intent = Intent(this, MainActivity::class.java)
        dailog = messages.loading("Alert is being sent", this)!!
        dailog.show()
        val details = OtherAlerts("", message, address, location)
        when(event) {
            "police" -> model.policeAlert(details).observe(this, Observer {
                if (it.status == "Success"){
                    dailog.dismiss()
                    messages.getMessage(it.data, this)
                    startActivity(intent)
                    finish()
                } else {
                    dailog.dismiss()
                    messages.getMessage(it.data, this)
                }
            })
            "hospital" -> model.hospitalAlert(details).observe(this, Observer {
                if (it.status == "Success"){
                    dailog.dismiss()
                    messages.getMessage(it.data, this)
                    startActivity(intent)
                    finish()
                } else {
                    dailog.dismiss()
                    messages.getMessage(it.data,this)
                }
            })
            "lawyer" -> model.lawyerAlert(details).observe(this, Observer {
                if (it.status == "Success"){
                    dailog.dismiss()
                    messages.getMessage(it.data, this)
                    startActivity(intent)
                    finish()
                } else {
                    dailog.dismiss()
                    messages.getMessage(it.data, this)
                }
            })
        }
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    fun onNetworkErrorEvent(event: NetworkErrorEvent) {
        messages.getMessage(event.message, this)
        dailog.dismiss()
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
