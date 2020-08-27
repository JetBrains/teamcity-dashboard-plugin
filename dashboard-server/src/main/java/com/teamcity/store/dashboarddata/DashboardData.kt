package com.teamcity.store.dashboarddata

import kotlinx.serialization.Serializable
import kotlinx.serialization.Transient
import kotlinx.serialization.json.JsonObject

@Serializable
data class GridElementData(val w: Int, val h: Int, val x: Int, val y: Int, val i: String) {
    @Transient
    val width = w
    @Transient
    val height = h
    @Transient
    val id = i
}

@Serializable
data class WidgetData(val id: String, val type: String, val data: JsonObject)

@Serializable
data class DashboardData(val layout: List<GridElementData>, val widgets: List<WidgetData>)
