package com.lovisgod.safehaven

import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.TextView
import android.widget.Toast
import androidx.cardview.widget.CardView
import androidx.core.app.ActivityCompat
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.lovisgod.safehaven.Models.Alert
import com.lovisgod.safehaven.Models.NetworkErrorEvent
import com.lovisgod.safehaven.Utils.DailogMessages
import com.lovisgod.safehaven.ViewModels.AppViewModel
import com.pixplicity.easyprefs.library.Prefs
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe
import org.greenrobot.eventbus.ThreadMode

class MainActivity : AppCompatActivity() {
    var messages = DailogMessages()

    companion object {

        private const val LOCATION_PERMISSION_REQUEST_CODE = 1
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setUpMap()
        var policeCall: CardView = findViewById(R.id.ploicebuttonCard)
        var hospitalCall: CardView = findViewById(R.id.hospitalbuttonCard)
        var lawyerCall : CardView = findViewById(R.id.lawyerbuttonCard)
        var historyView: CardView = findViewById(R.id.historybuttonCard)
        var sosClick: TextView = findViewById(R.id.sos_click)
        var model = ViewModelProviders.of(this)[AppViewModel::class.java]

        policeCall.setOnClickListener {
            openEventActivity("police")
        }

        hospitalCall.setOnClickListener {
            openEventActivity("hospital")
        }

        lawyerCall.setOnClickListener {
            openEventActivity("lawyer")
        }


        sosClick.setOnClickListener {
            var details: Alert = Alert("New Tech Zone Park")
            model.sosAlert(details).observe(this, Observer {
                Log.d("sos", "sos is ${it.status}")
            })
        }

    }

    fun openEventActivity(event: String) {
        val intent = Intent(this, EventActivity::class.java)
        Prefs.putString("event", event)
        startActivity(intent)
    }


    @Subscribe(threadMode = ThreadMode.MAIN)
    fun onNetworkErrorEvent(event: NetworkErrorEvent) {
        messages.getMessage(event.message, this)
    }

    override fun onStart() {
        super.onStart()
        EventBus.getDefault().register(this)
    }

    override fun onStop() {
        EventBus.getDefault().unregister(this)
        super.onStop()
    }

    private fun setUpMap() {
        if (ActivityCompat.checkSelfPermission(
                this,
                android.Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(android.Manifest.permission.ACCESS_FINE_LOCATION),
                LOCATION_PERMISSION_REQUEST_CODE
            )
            return
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        Log.d("TAG", "$requestCode, $resultCode, $data")
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
               Toast.makeText(this, "Location enabled", Toast.LENGTH_LONG).show()
            }
        }
    }
}
