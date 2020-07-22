package com.teamcity.controllers

import jetbrains.buildServer.controllers.BaseController
import jetbrains.buildServer.web.openapi.PluginDescriptor
import jetbrains.buildServer.web.openapi.WebControllerManager
import org.springframework.ui.ModelMap
import org.springframework.web.servlet.ModelAndView
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class TestController(manager: WebControllerManager, private val descriptor: PluginDescriptor) : BaseController() {
    companion object {
        const val BUNDLE_DEV_URL = "http://localhost:9091"
    }

    init {
        manager.registerController("/dashboardPlugin.html", this)
    }

    override fun doHandle(p0: HttpServletRequest, p1: HttpServletResponse): ModelAndView? {
        val model = ModelMap("bundleDevUrl", "$BUNDLE_DEV_URL/")
        return ModelAndView(descriptor.getPluginResourcesPath("dashboard.jsp"), model)
    }
}
