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
                        }
                    )}
                    placeholder="Время появления"
                    type={"number"}
                />
            )}
            {arrivaltype === "normal" && parkingType === 'random' && (
                <>
                    <Primaryinput
                        register={formStates.register("parking_time_config.mean", {
                            required: true,
                        })}
                        placeholder="Медиана"
                        type={"number"}
                    />
                    <Primaryinput
                        register={formStates.register(
                            "parking_time_config.std_dev",
                            {
                                required: true,
                            }
                        )}
                        placeholder="Дисперсия"
                        type={"number"}
                    />
                </>
            )}
            {arrivaltype === "exponential" && parkingType === 'random' && (
                <>
                    <Primaryinput
                        register={formStates.register("parking_time_config.lambda", {
                            required: true,
                        })}
                        placeholder="Интенсивность"
                        type={"number"}
                    />
                </>
            )}
            {arrivaltype === "uniform" && parkingType === 'random' && (
                <>
                    <Primaryinput
                        register={formStates.register(
                            "parking_time_config.min_delay",
                            {
                                required: true,
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
                register={formStates.register("parking_time_config.parking_prob", {
                    required: true,
                })}
                placeholder="Вероятность заезда"
                type={"number"}
            />
        </>
    );
};
export { TimeConfig };
