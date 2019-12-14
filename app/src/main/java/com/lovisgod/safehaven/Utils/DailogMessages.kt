package com.lovisgod.safehaven.Utils

import android.content.Context
import android.content.DialogInterface
import androidx.appcompat.app.AlertDialog
import com.lovisgod.safehaven.R
import dmax.dialog.SpotsDialog

class DailogMessages {
    fun getMessage(message: String, context: Context){
        val builder = AlertDialog.Builder(context)
        builder.setTitle("Transporta")
        builder.setMessage(message)
        builder.setPositiveButton("OK"){ dialog: DialogInterface?, which: Int ->
            // do something
        }
        val alertDialog = builder.create()
        alertDialog.setCancelable(false)
        alertDialog.show()
    }

    fun loading(message: String = "loading", context: Context): android.app.AlertDialog? {
        val dialog = SpotsDialog.Builder()
            .setContext(context)
            .setMessage(message)
            .setCancelable(false)
            .build()
        return dialog
    }
}