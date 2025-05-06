import { useState, useEffect } from "react";
import $api from "@/http";
import { AxiosResponse } from "axios";
function useFetch(url:string, flag:boolean) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (flag) {
            setLoading(true);
            setData(null);
            setError(false);
            $api.get(url)
                .then((res:AxiosResponse) => {
                    setLoading(false);
                    let data:any = res.data;
                    if (data.isNextPage) {
                        delete data.isNextPage;
                        data = Object.values(data);
                    }
                    data && setData(data);
                })
                .catch((err) => {
                    setError(true);
                    setLoading(false);
                    console.log(err);
                });
        }
    }, [url, flag]);

    return { data, loading, error };
}
export default useFetch;
