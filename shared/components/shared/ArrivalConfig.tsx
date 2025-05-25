import { Primaryinput } from "../ui/Primaryinput";
import { PrimarySelect } from "../ui/PrimarySelect";
import styles from "./ArrivalConfig.module.scss";
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
                        }
                    )}
                    placeholder="Время появления"
                    type={"number"}
                />
            )}
            {arrivaltype === "normal" && (
                <>
                    <Primaryinput
                        register={formStates.register("arrival_config.mean", {
                            required: true,
                        })}
                        placeholder="Медиана"
                        type={"number"}
                    />
                    <Primaryinput
                        register={formStates.register(
                            "arrival_config.std_dev",
                            {
                                required: true,
                            }
                        )}
                        placeholder="Дисперсия"
                        type={"number"}
                    />
                </>
            )}
            {arrivaltype === "exponential" && (
                <>
                    <Primaryinput
                        register={formStates.register("arrival_config.lambda", {
                            required: true,
                        })}
                        placeholder="Интенсивность"
                        type={"number"}
                    />
                </>
            )}
            {arrivaltype === "uniform" && (
                <>
                    <Primaryinput
                        register={formStates.register(
                            "arrival_config.min_delay",
                            {
                                required: true,
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
                            }
                        )}
                        placeholder="максимальное значение"
                        type={"number"}
                    />
                </>
            )}
            <Primaryinput
                register={formStates.register("start_time", {
                    required: true,
                })}
                placeholder="Время начала"
                type={"number"}
            />
            <Primaryinput
                register={formStates.register("arrival_config.parking_prob", {
                    required: true,
                })}
                placeholder="Вероятность заезда"
                type={"number"}
            />
        </>
    );
};
export { ArrivalConfig };
