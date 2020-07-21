package com.teamcity.controllers

import DashboardsStore
import com.teamcity.store.db.TeamcityUserPropertyDB
import dashboarddata.DashboardData
import jetbrains.buildServer.controllers.BaseController
import jetbrains.buildServer.users.SUser
import jetbrains.buildServer.web.openapi.PluginDescriptor
import jetbrains.buildServer.web.openapi.WebControllerManager
import jetbrains.buildServer.web.util.SessionUser
import org.springframework.http.HttpStatus
import org.springframework.web.servlet.ModelAndView
import parser.JsonDashboardDataSerializer
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.nio.charset.StandardCharsets
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class RestController(private val manager: WebControllerManager, private val descriptor: PluginDescriptor) : BaseController() {

    companion object {
        val initialDashboardData = DashboardData(listOf(), listOf())
    }

    private val store = DashboardsStore(TeamcityUserPropertyDB(), JsonDashboardDataSerializer(), initialDashboardData)

    init {
        manager.registerController("/dashboardData.html", this)
    }

    private fun respondWithData(user: SUser, request: HttpServletRequest, response: HttpServletResponse): ModelAndView?  {
        val data = store.getVerifiedString(user)
        response.contentType = "application/json"
        val writer = OutputStreamWriter(response.outputStream, StandardCharsets.UTF_8)
        writer.write(data)
        writer.flush()
        writer.close()
        return null
    }

    private fun acceptData(user: SUser, request: HttpServletRequest, response: HttpServletResponse): ModelAndView? {
        if (request.contentType != "application/json") {
            // only accept json
            response.status = HttpStatus.BAD_REQUEST.value()
            return null
        }
        val reader = InputStreamReader(request.inputStream, StandardCharsets.UTF_8)
        val data = reader.readText()
        reader.close()
        try {
            store.put(user, data)
        } catch (e: DashboardsStore.ReceivedInvalidData) {
            response.status = HttpStatus.BAD_REQUEST.value()
        }
        response.status = HttpStatus.ACCEPTED.value()
        return null
    }

    override fun doHandle(request: HttpServletRequest, response: HttpServletResponse): ModelAndView? {
        val user = SessionUser.getUser(request)
        if (user == null) {
            // TODO: talk to Denis about it
            response.status = HttpStatus.UNAUTHORIZED.value()
            return null
        }
        return when {
            isGet(request) -> respondWithData(user, request, response)
            isPost(request) -> acceptData(user, request, response)
            else -> {
                // TODO: talk to Denis about it too
                response.status = HttpStatus.METHOD_NOT_ALLOWED.value()
                null
            }
        }
    }
}
