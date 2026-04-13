package com.opcsnsproj.amap

import android.view.View
import com.amap.api.maps.CameraUpdateFactory
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

@Suppress("unused")
internal class
MapViewManager : ViewGroupManager<AMap3DView>() {
  private val commands = mapOf(
    "moveCamera" to { view: AMap3DView, args: ReadableArray? -> view.moveCamera(args) },
    "call" to { view: AMap3DView, args: ReadableArray? -> view.call(args) },
  )

  override fun getName(): String {
    return "AMapView"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): AMap3DView {
    return AMap3DView(reactContext)
  }

  override fun onDropViewInstance(view: AMap3DView) {
    super.onDropViewInstance(view)
    view.onDestroy()
  }

  override fun getCommandsMap(): Map<String, Int> {
    return commands.keys.mapIndexed { index, key -> key to index }.toMap()
  }

  override fun receiveCommand(view: AMap3DView, command: Int, args: ReadableArray?) {
    commands.values.toList()[command](view, args)
  }

  override fun addView(mapView: AMap3DView, child: View, index: Int) {
    mapView.add(child)
    super.addView(mapView, child, index)
  }

  override fun removeViewAt(parent: AMap3DView, index: Int) {
    parent.remove(parent.getChildAt(index))
    super.removeViewAt(parent, index)
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return getEventTypeConstants(
      "onLoad",
      "onPress",
      "onPressPoi",
      "onLongPress",
      "onCameraMove",
      "onCameraIdle",
      "onLocation",
      "onCallback",
    )
  }

  @ReactProp(name = "initialCameraPosition")
  fun setInitialCameraPosition(view: AMap3DView, position: ReadableMap) {
    view.setInitialCameraPosition(position)
  }

  @ReactProp(name = "myLocationEnabled")
  fun setMyLocationEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.isMyLocationEnabled = enabled
  }

  @ReactProp(name = "indoorViewEnabled")
  fun setIndoorViewEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.showIndoorMap(enabled)
  }

  @ReactProp(name = "buildingsEnabled")
  fun setBuildingsEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.showBuildings(enabled)
  }

  @ReactProp(name = "compassEnabled")
  fun setCompassEnabled(view: AMap3DView, show: Boolean) {
    view.map.uiSettings.isCompassEnabled = show
  }

  @ReactProp(name = "zoomControlsEnabled")
  fun setZoomControlsEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.uiSettings.isZoomControlsEnabled = enabled
  }

  @ReactProp(name = "scaleControlsEnabled")
  fun setScaleControlsEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.uiSettings.isScaleControlsEnabled = enabled
  }

  @ReactProp(name = "language")
  fun setLanguage(view: AMap3DView, language: String) {
    view.map.setMapLanguage(language)
  }

  @ReactProp(name = "myLocationButtonEnabled")
  fun setMyLocationButtonEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.uiSettings.isMyLocationButtonEnabled = enabled
  }

  @ReactProp(name = "trafficEnabled")
  fun setTrafficEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.isTrafficEnabled = enabled
  }

  @ReactProp(name = "maxZoom")
  fun setMaxZoom(view: AMap3DView, zoomLevel: Float) {
    view.map.maxZoomLevel = zoomLevel
  }

  @ReactProp(name = "minZoom")
  fun setMinZoom(view: AMap3DView, zoomLevel: Float) {
    view.map.minZoomLevel = zoomLevel
  }

  @ReactProp(name = "mapType")
  fun setMapType(view: AMap3DView, mapType: Int) {
    view.map.mapType = mapType + 1
  }

  @ReactProp(name = "zoomGesturesEnabled")
  fun setZoomGesturesEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.uiSettings.isZoomGesturesEnabled = enabled
  }

  @ReactProp(name = "scrollGesturesEnabled")
  fun setScrollGesturesEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.uiSettings.isScrollGesturesEnabled = enabled
  }

  @ReactProp(name = "rotateGesturesEnabled")
  fun setRotateGesturesEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.uiSettings.isRotateGesturesEnabled = enabled
  }

  @ReactProp(name = "tiltGesturesEnabled")
  fun setTiltGesturesEnabled(view: AMap3DView, enabled: Boolean) {
    view.map.uiSettings.isTiltGesturesEnabled = enabled
  }

  @ReactProp(name = "cameraPosition")
  fun setCameraPosition(view: AMap3DView, center: ReadableMap) {
    view.map.moveCamera(CameraUpdateFactory.changeLatLng(center.toLatLng()))
  }
}
