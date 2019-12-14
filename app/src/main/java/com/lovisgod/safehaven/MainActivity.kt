package com.lovisgod.safehaven

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.cardview.widget.CardView

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        var policeCall: CardView = findViewById(R.id.ploicebuttonCard)
        var hospitalCall: CardView = findViewById(R.id.hospitalbuttonCard)
        var lawyerCall : CardView = findViewById(R.id.lawyerbuttonCard)
        var historyView: CardView = findViewById(R.id.historybuttonCard)

        policeCall.setOnClickListener {
            openEventActivity("police")
        }

        hospitalCall.setOnClickListener {
            openEventActivity("hospital")
        }

        lawyerCall.setOnClickListener {
            openEventActivity("lawyer")
        }


    }

    fun openEventActivity(event: String) {
        val intent = Intent(this, EventActivity::class.java)
        intent.putExtra("whoto", event)
        startActivity(intent)
    }
}
