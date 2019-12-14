package com.lovisgod.safehaven.Utils

import android.app.Application
import android.content.Context
import com.pixplicity.easyprefs.library.Prefs

class MainApplication: Application() {

    override fun onCreate() {
        super.onCreate()
        // initailize pref library
        Prefs.Builder()
            .setContext(this)
            .setMode(Context.MODE_PRIVATE)
            .setPrefsName(packageName)
            .setUseDefaultSharedPreference(true)
            .build()
    }
}