package com.teamcity.store.db

import interfaces.UserPropertyDB
import jetbrains.buildServer.users.PluginPropertyKey
import jetbrains.buildServer.users.SUser

class TeamcityUserPropertyDB : UserPropertyDB<SUser> {
    companion object {
        val PLUGIN_TYPE = "WebUI_Extension"
        val PLUGIN_NAME = "Dashboard"

        val dashboardDataPropertyKey = PluginPropertyKey(PLUGIN_TYPE, PLUGIN_NAME, "data")
    }

    override fun get(user: SUser): String? {
        return user.getPropertyValue(dashboardDataPropertyKey)
    }

    override fun put(user: SUser, value: String) {
        user.setUserProperty(dashboardDataPropertyKey, value)
    }

}