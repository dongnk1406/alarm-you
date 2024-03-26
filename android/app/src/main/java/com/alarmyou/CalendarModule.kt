package com.alarmyou

import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

class CalendarModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var eventCount: Int = 0

    @ReactMethod
    override fun getName(): String {
        return "CalendarModule"
    }

    @ReactMethod
    fun createCalendarEvent(callback: Callback) {
        Log.d("dTag", "CalendarModule Create event")
        callback?.invoke("CalendarModule invoke callback from Native Module")
    }


    @ReactMethod
    fun createCalendarPromise(promise: Promise) {
        try {
            promise.resolve("CalendarModule invoke Promise from Native Module")
            sendEvent(reactApplicationContext, "EventCount", eventCount)
            eventCount++
        } catch (e: Throwable) {
            promise.reject("Create Event Error", e)
        }
    }

    private fun sendEvent(reactContext: ReactContext, eventName: String, params: Int) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }
}


