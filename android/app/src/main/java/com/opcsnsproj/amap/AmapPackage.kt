package com.opcsnsproj.amap

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class AmapPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
        listOf(SdkModule(reactContext))

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
            MapViewManager(),
            MarkerManager(),
            PolylineManager(),
            PolygonManager(),
            CircleManager(),
            HeatMapManager(),
            MultiPointManager(),
        )
    }
}
