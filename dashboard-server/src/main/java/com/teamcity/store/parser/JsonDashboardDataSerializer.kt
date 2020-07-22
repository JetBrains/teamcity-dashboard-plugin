package parser

import com.teamcity.store.dashboarddata.DashboardData
import com.teamcity.store.interfaces.DashboardDataSerializer
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonConfiguration
import kotlinx.serialization.json.JsonException

class JsonDashboardDataSerializer : DashboardDataSerializer {
    private val jsonConfig = JsonConfiguration.Stable.copy(ignoreUnknownKeys = true)
    private val jsonParser = Json(jsonConfig)

    override fun parse(string: String): DashboardData {
        return try {
            jsonParser.parse(DashboardData.serializer(), string)
        } catch (e: SerializationException) {
            throw DashboardDataSerializer.SerializationException(e.message)
        } catch (e: JsonException) {
            throw DashboardDataSerializer.SerializationException(e.message)
        }
    }

    override fun stringify(data: DashboardData): String {
        return try {
            jsonParser.stringify(DashboardData.serializer(), data)
        } catch (e: SerializationException) {
            throw DashboardDataSerializer.SerializationException(e.message)
        } catch (e: JsonException) {
            throw DashboardDataSerializer.SerializationException(e.message)
        }
    }

    override fun isValid(data: String): Boolean {
        try {
            parse(data)
        } catch (e: DashboardDataSerializer.SerializationException) {
            return false
        }
        return true
    }
}
