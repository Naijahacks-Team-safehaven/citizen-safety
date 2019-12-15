package com.lovisgod.safehaven.Utils

import android.content.Context
import android.location.Address
import android.location.Geocoder
import android.util.Log
import com.google.android.gms.maps.model.LatLng
import java.io.IOException
import java.util.*

class Geocode {
     suspend fun getAddress(latt: Double, long:Double, context: Context): String? {
        var addressList: List<Address>? = null
        var name: String? = null
        val geocoder = Geocoder(context, Locale.getDefault())
        try {
            addressList = geocoder.getFromLocation(latt, long, 10)

        } catch (e: IOException) {
            e.printStackTrace()
        }

        if (null == addressList || addressList.isEmpty()){
            //
        }

        addressList?.let {
            val locationAdress = addressList[0]
            name = locationAdress.getAddressLine(0)
        }

        Log.i("TAG", "${name}")

        return name

    }
}