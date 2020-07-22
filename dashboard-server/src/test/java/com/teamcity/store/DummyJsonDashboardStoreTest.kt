import dashboarddata.DashboardData
import db.DummyMapDB
import interfaces.DashboardDataSerializer
import interfaces.UserPropertyDB
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

    override fun getCleanStore(db: UserPropertyDB<Int>, serializer: DashboardDataSerializer): DashboardsStore<Int> = DashboardsStore(db, serializer, initialDashboardData)
}