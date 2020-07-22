import com.teamcity.store.dashboarddata.DashboardData
import com.teamcity.store.dashboarddata.GridElementData
import com.teamcity.store.dashboarddata.WidgetData
import com.teamcity.store.interfaces.DashboardDataSerializer
import com.teamcity.store.interfaces.UserPropertyDB
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

internal abstract class DashboardsStoreTest<U> {
    abstract var serializer: DashboardDataSerializer
    abstract var db: UserPropertyDB<U>
    abstract var initialDashboardData: DashboardData
    abstract var store: DashboardsStore<U>

    private fun generateWidgetData(index: Int): WidgetData {
        val data = mutableMapOf<String, String>()
        for (i in 0 until index) {
            data["$i"] = "$i"
        }
        return WidgetData("$index", "widget-$index", data)
    }

    private fun generateGridElementData(index: Int): GridElementData {
        return GridElementData(1, 1, index, index, "$index")
    }

    private fun generateDashboard(userId: Int): DashboardData {
        val layout = List(userId) { generateGridElementData(it) }
        val widgetData = List(userId) { generateWidgetData(it) }
        return DashboardData(layout, widgetData)
    }

    abstract fun generateInvalidData(index: Int): String

    abstract fun getUser(index: Int): U

    abstract fun getCleanDB(): UserPropertyDB<U>

    abstract fun getCleanStore(db: UserPropertyDB<U>, serializer: DashboardDataSerializer): DashboardsStore<U>

    @BeforeEach
    fun init() {
        db = getCleanDB()
        store = getCleanStore(db, serializer)
    }

    @Test
    fun `should return initialDashboardData if user does not have a dashboard 0`() {
        assertEquals(initialDashboardData, store.get(getUser(0)))
    }

    @Test
    fun `should return initialDashboardData if user does not have a dashboard 1`() {
        assertEquals(initialDashboardData, store.get(getUser(1)))
    }

    @Test
    fun `should return stored dashboard for 1 user`() {
        val data = generateDashboard(50)
        store.put(getUser(50), data)
        assertEquals(data, store.get(getUser(50)))
    }

    @Test
    fun `should return stored dashboards for many user`() {
        val data = List<DashboardData>(100) { generateDashboard(it) }
        for ((userId, dashboard) in data.withIndex()) {
            store.put(getUser(userId), dashboard)
        }
        val actual = List(100) { store.get(getUser(it)) }
        assertEquals(data, actual)
    }

    @Test
    fun `put should replace old values`() {
        val oldData = generateDashboard(10)
        val newData = generateDashboard(20)
        store.put(getUser(5), oldData)
        store.put(getUser(5), newData)
        assertEquals(newData, store.get(getUser(5)))
    }

    @Test
    fun `should throw if receives invalid data`() {
        val invalidData = generateInvalidData(10)
        assertThrows(DashboardsStore.ReceivedInvalidData::class.java) {
            store.put(getUser(10), invalidData)
        }
    }

    @Test
    fun `should throw if db contains invalid data`() {
        val invalidData = generateInvalidData(15)
        db.put(getUser(15), invalidData)
        assertThrows(DashboardsStore.InvalidDataInDatabaseException::class.java) {
            store.get(getUser(15))
        }
    }
}
