package com.teamcity.store.db

import com.teamcity.store.interfaces.UserPropertyDB

class DummyMapDB : UserPropertyDB<Int> {
    private val data = mutableMapOf<Int, String>()
    override fun get(user: Int): String? = data[user]

    override fun put(user: Int, value: String) {
        data[user] = value
    }
}
