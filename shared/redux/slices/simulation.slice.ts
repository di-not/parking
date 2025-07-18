import { TopologyType } from "@/@types/topologyType";
import { SimulateForm } from "@/shared/components/ui/SimulateOptionsModal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SimulationType = SimulateForm & { parking: TopologyType };

const initialState: SimulationType = {
    parking: {
        name: "",
        address: "",
        width: 4,
        height: 4,
        day_tariff: 0,
        night_tariff: 0,
        manager: { id: 0 },
        cells: [],
        
    },
    arrival_config: {
        type: "normal",
        parking_prob: 0,
    },
    parking_time_config: {
        type: "normal",
    },
    start_time: 1716542400,
};

const simulationSlice = createSlice({
    name: "Simulation",
    initialState,
    reducers: {
        setInitial: (state) => {

            state.arrival_config = {
                type: "normal",
                parking_prob: 0,
            };

            state.parking_time_config = {
                type: "normal",
            };
        },
        setSimulation: (state, { payload }: PayloadAction<SimulationType>) => {
            state = payload;
        },
        setSimulationTopology: (
            state,
            { payload }: PayloadAction<TopologyType>
        ) => {
            state.parking = payload;
            state.parking.height = payload.cells.length;
            state.parking.width = payload.cells[0].length;
            state.parking.day_tariff = payload.day_tariff;
            state.parking.night_tariff = payload.night_tariff;
        },
        setSimulationConfig: (
            state,
            { payload }: PayloadAction<SimulateForm>
        ) => {
            state.arrival_config = payload.arrival_config;
            state.parking_time_config = payload.parking_time_config;
            state.start_time = payload.start_time;
        },
    },
});
export const {
    setSimulation,
    setSimulationConfig,
    setSimulationTopology,
    setInitial,
} = simulationSlice.actions;
export default simulationSlice.reducer;
