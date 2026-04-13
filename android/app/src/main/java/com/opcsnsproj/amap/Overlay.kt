package com.opcsnsproj.amap

import com.amap.api.maps.AMap

interface Overlay {
  fun add(map: AMap)
  fun remove()
}
