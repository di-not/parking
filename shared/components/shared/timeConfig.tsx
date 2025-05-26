import { Primaryinput } from "../ui/Primaryinput";
import { PrimarySelect } from "../ui/PrimarySelect";
interface TimeConfigProps {
    formStates: any;
}
const TimeConfig: React.FC<TimeConfigProps> = ({ formStates }) => {
    const parkingType = formStates.watch("parking_time_config.parkingType");
    const arrivaltype = formStates.watch("parking_time_config.type");
    return (
        <>
            <PrimarySelect
                formStates={formStates}
                title="Тип высчитывания времени"
                data={[
                    {
                        title: "Детерминированное время",
                        value: "determind",
                    },
                    { title: "Случайное время", value: "random" },
                ]}
                formValue={"parking_time_config.parkingType"}
            />
            {parkingType === "random" && (
                <PrimarySelect
                    formStates={formStates}
                    title="Тип распределения"
                    data={[
                        {
                            title: "Экспоненциальный",
                            value: "exponential",
                        },
                        {
                            title: "Нормальный",
                            value: "normal",
                        },
                        {
                            title: "Равномерный",
                            value: "uniform",
                        },
                    ]}
                    formValue={"parking_time_config.type"}
                />
            )}
            {parkingType === "determind" && (
                <Primaryinput
                    register={formStates.register(
                        "parking_time_config.discrete_time",
                        {
                            required: true,
                            valueAsNumber: true,
                        }
                    )}
                    placeholder="Время появления"
                    type={"number"}
                />
            )}
            {arrivaltype === "normal" && parkingType === "random" && (
                <>
                    <Primaryinput
                        register={formStates.register(
                            "parking_time_config.mean",
                            {
                                required: true,
                                valueAsNumber: true,
                                min: 2,
                                max: 15,
                            }
                        )}
                        placeholder="Медиана"
                        type={"number"}
                    />
                    <Primaryinput
                        register={formStates.register(
                            "parking_time_config.std_dev",
                            {
                                required: true,
                                valueAsNumber: true,
                                min: 0.1,
                                max: 15,
                            }
                        )}
                        step={0.01}
                        placeholder="Дисперсия"
                        type={"number"}
                    />
                </>
            )}
            {arrivaltype === "exponential" && parkingType === "random" && (
                <>
                    <Primaryinput
                        register={formStates.register(
                            "parking_time_config.lambda",
                            {
                                required: true,
                                valueAsNumber: true,
                                min: 0.1,
                                max: 1,
                            }
                        )}
                        placeholder="Интенсивность"
                        step={0.01}
                        type={"number"}
                    />
                </>
            )}
            {arrivaltype === "uniform" && parkingType === "random" && (
                <>
                    <Primaryinput
                        register={formStates.register(
                            "parking_time_config.min_delay",
                            {
                                required: true,
                                valueAsNumber: true,
                                min: 2,
                                max: 15,
                            }
                        )}
                        placeholder="минимальное значение"
                        type={"number"}
                    />
                    <Primaryinput
                        register={formStates.register(
                            "parking_time_config.max_delay",
                            {
                                required: true,
                                valueAsNumber: true,
                                min: 2,
                                max: 15,
                            }
                        )}
                        placeholder="максимальное значение"
                        type={"number"}
                    />
                </>
            )}
        </>
    );
};
export { TimeConfig };
