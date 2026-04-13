package com.opcsnsproj.amap

import com.amap.api.maps.MapsInitializer
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

@Suppress("unused")
class SdkModule(val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
  override fun getName(): String {
    return "AMapSdk"
  }

  @ReactMethod
  fun initSDK(apiKey: String) {
    MapsInitializer.setApiKey(apiKey)
  }

  @ReactMethod
  fun getVersion(promise: Promise) {
    promise.resolve(MapsInitializer.getVersion())
  }
}
