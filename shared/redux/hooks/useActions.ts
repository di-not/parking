import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import {
    setTopology,
    setTopologyWithoutCells,
    setTopologyCells,
} from "../slices/topology.slice";
import { setSearch } from "../slices/searchParams.slice";

const rootActions = {
    setTopology,
    setTopologyWithoutCells,
    setTopologyCells,
    setSearch,
};

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>();
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
