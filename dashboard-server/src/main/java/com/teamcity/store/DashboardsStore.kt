import dashboarddata.DashboardData
import interfaces.DashboardDataSerializer
import interfaces.UserPropertyDB
import java.lang.IllegalArgumentException

class DashboardsStore<U>(
        private val userPropertyDB: UserPropertyDB<U>,
        private val serializer: DashboardDataSerializer,
        private val initialDashboardData: DashboardData
) {

    private val initialDashboardStringData = serializer.stringify(initialDashboardData)

    fun get(user: U): DashboardData {
        val userProperty = userPropertyDB.get(user) ?: return initialDashboardData
        return try {
            serializer.parse(userProperty)
        } catch (e: DashboardDataSerializer.SerializationException) {
            throw InvalidDataInDatabaseException(e.message)
        }
    }

    fun getVerifiedString(user: U): String {
        val userProperty = userPropertyDB.get(user) ?: return initialDashboardStringData
        if (!serializer.isValid(userProperty)) {
            throw ReceivedInvalidData("Serializer considers the data invalid")
        }
        return userProperty
    }

    fun put(user: U, dashboardData: DashboardData) {
        val serializedData = try {
            serializer.stringify(dashboardData)
        } catch (e: DashboardDataSerializer.SerializationException) {
            throw ReceivedInvalidData(e.message)
        }
        userPropertyDB.put(user, serializedData)
    }

    fun put(user: U, dashboardData: String) {
       if (!serializer.isValid(dashboardData)) {
           throw ReceivedInvalidData("Serializer considers the data invalid")
       }
        userPropertyDB.put(user, dashboardData)
    }

    class InvalidDataInDatabaseException(msg: String?) : Exception(msg)

    class ReceivedInvalidData(msg: String?) : IllegalArgumentException(msg)

}