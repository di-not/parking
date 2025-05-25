import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import {
    setTopology,
    setTopologyWithoutCells,
    setTopologyCells,
} from "../slices/topology.slice";
import { fetchParkings } from "../slices/parkings.slice";
import { setSearch } from "../slices/searchParams.slice";
import { setSimulation, setSimulationConfig, setSimulationTopology  } from "../slices/simulation.slice";
import { setAuth, setRole } from "../slices/auth.slice";

const rootActions = {
    setTopology,
    setTopologyWithoutCells,
    setTopologyCells,
    setSearch,
    fetchParkings,
    setAuth,
    setRole,setSimulation, setSimulationConfig, setSimulationTopology 
};

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>();
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
