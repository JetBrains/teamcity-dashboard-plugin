package interfaces

interface UserPropertyDB<U> {
    fun get(user: U): String?
    fun put(user: U, value: String)
}
