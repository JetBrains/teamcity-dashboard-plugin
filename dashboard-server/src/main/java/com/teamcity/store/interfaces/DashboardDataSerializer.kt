package com.teamcity.store.interfaces

import com.teamcity.store.dashboarddata.DashboardData
import java.lang.Exception

interface DashboardDataSerializer {
    fun parse(string: String): DashboardData
    fun stringify(data: DashboardData): String
    fun isValid(data: String): Boolean

    class SerializationException(msg: String?) : Exception(msg)
}
