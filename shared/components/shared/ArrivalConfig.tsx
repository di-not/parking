import { Primaryinput } from "../ui/Primaryinput";
import { PrimarySelect } from "../ui/PrimarySelect";
interface ArrivalConfigProps {
    formStates: any;
}
const ArrivalConfig: React.FC<ArrivalConfigProps> = ({ formStates }) => {
    const traficType = formStates.watch("arrival_config.traficType");
    const arrivaltype = formStates.watch("arrival_config.type");
    return (
        <>
            <PrimarySelect
                formStates={formStates}
                title="Тип трафика"
                data={[
                    {
                        title: "Детерминированный трафик",
                        value: "determind",
                    },
                    { title: "Случайный трафик", value: "random" },
                ]}
                formValue={"arrival_config.traficType"}
            />
            {traficType === "random" && (
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
                    formValue={"arrival_config.type"}
                />
            )}
            {traficType === "determind" && (
                <Primaryinput
                    register={formStates.register(
                        "arrival_config.discrete_time",
                        {
                            required: true,
                            valueAsNumber: true,
                        }
                    )}
                    placeholder="Время появления"
                    type={"number"}
                />
            )}
            {arrivaltype === "normal" && traficType === "random" && (
                <>
                    <Primaryinput
                        register={formStates.register("arrival_config.mean", {
                            required: true,
                            valueAsNumber: true,
                            min: 2,
                            max: 15,
                        })}
                        placeholder="Медиана"
                        type={"number"}
                    />
                    <Primaryinput
                        register={formStates.register(
                            "arrival_config.std_dev",
                            {
                                required: true,
                                valueAsNumber: true,
                                min: 0.1,
                                max: 15,
                            }
                        )}
                        placeholder="Дисперсия"
                        type={"number"}
                        step={0.01}
                    />
                </>
            )}
            {arrivaltype === "exponential" && traficType === "random" && (
                <>
                    <Primaryinput
                        register={formStates.register("arrival_config.lambda", {
                            required: true,
                            valueAsNumber: true,
                            min: 0.1,
                            max: 1,
                        })}
                        step={0.01}
                        placeholder="Интенсивность"
                        type={"number"}
                    />
                </>
            )}
            {arrivaltype === "uniform" && traficType === "random" && (
                <>
                    <Primaryinput
                        register={formStates.register(
                            "arrival_config.min_delay",
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
                            "arrival_config.max_delay",
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

            <Primaryinput
                register={formStates.register("arrival_config.parking_prob", {
                    required: true,
                    valueAsNumber: true,
                    min: 0.1,
                    max: 1,
                })}
                step={0.01}
                placeholder="Вероятность заезда"
                type={"number"}
            />
        </>
    );
};
export { ArrivalConfig };
