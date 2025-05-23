'use client'
import useFetch from "@/shared/hooks/useFetch";

const ManagerPark: React.FC =()  => {
    const {data,loading,error} = useFetch('/parking',true)
    return (
        <div>
            <h1></h1>
        </div>
    );
};
export { ManagerPark };
