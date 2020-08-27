// @flow strict

import type { WidgetType } from '../widgets.types'
import type { Component, WidgetComponents } from './widgetComponents.types'
import widgetComponents from './widgetComponents'

const emptyArray = []

type Selector<T> = (WidgetType) => T

const getWidgetComponents: Selector<?WidgetComponents> = (type) =>
	widgetComponents[type]

export const getWidgetHeaderComponent: Selector<?Component> = (type) =>
	getWidgetComponents(type)?.Header

export const getWidgetBodyComponent: Selector<?Component> = (type) =>
	getWidgetComponents(type)?.Body

export const getWidgetSettingsComponent: Selector<?Component> = (type) =>
	getWidgetComponents(type)?.Settings

export const getWidgetHeaderOptions: Selector<Component[]> = (type) =>
	getWidgetComponents(type)?.headerOptions ?? emptyArray
