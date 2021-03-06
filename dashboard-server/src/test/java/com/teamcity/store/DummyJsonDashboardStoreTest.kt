import com.teamcity.store.dashboarddata.DashboardData
import com.teamcity.store.db.DummyMapDB
import com.teamcity.store.interfaces.DashboardDataSerializer
import com.teamcity.store.interfaces.UserPropertyDB
import parser.JsonDashboardDataSerializer

internal class DummyJsonDashboardStoreTest : DashboardsStoreTest<Int>(){
    override var serializer: DashboardDataSerializer = JsonDashboardDataSerializer()

    override var db: UserPropertyDB<Int> = DummyMapDB()
    override var initialDashboardData = DashboardData(listOf(), listOf())
    override var store = DashboardsStore(db, serializer, initialDashboardData)

    override fun generateInvalidData(index: Int): String {
        return "bad".repeat(index)
    }

    override fun getUser(index: Int): Int = index

    override fun getCleanDB(): UserPropertyDB<Int> = DummyMapDB()

    override fun getCleanStore(db: UserPropertyDB<Int>, serializer: DashboardDataSerializer): DashboardsStore<Int>
            = DashboardsStore(db, serializer, initialDashboardData)
}
