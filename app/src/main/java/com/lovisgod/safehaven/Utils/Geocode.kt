package com.lovisgod.safehaven.Utils

import android.content.Context
import android.location.Address
import android.location.Geocoder
import android.util.Log
import com.google.android.gms.maps.model.LatLng
import java.io.IOException
import java.util.*

class Geocode {
    fun getLocation(input:String, context: Context): LatLng? {
        var addressList: List<Address>? = null
        var latlng: LatLng? = null
        val geocoder = Geocoder(context, Locale.getDefault())
        try {
            addressList = geocoder.getFromLocationName(input, 10)

        } catch (e: IOException) {
            e.printStackTrace()
        }

        if (null == addressList || addressList.isEmpty()){
            //
        }

        addressList?.let {
            val locationAdress = addressList[0]
            val lat = locationAdress.latitude
            val lng = locationAdress.longitude
            latlng = LatLng(lat, lng)
        }

        Log.i("TAG", "${latlng?.latitude}")

        return latlng

    }
}