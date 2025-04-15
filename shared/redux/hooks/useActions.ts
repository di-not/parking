import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'
import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import {
	setTopology
} from '../slices/topology.slice'

const rootActions = {
	setTopology
}

export const useActions = () => {
	const dispatch = useDispatch<AppDispatch>()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
