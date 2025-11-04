import {useState} from "react";
import useFetchProducts from "./useFetchProducts";

export const useCurrentProductById = (id) => {
    console.log("useProductById");
    const { data } = useFetchProducts('all');
    const [result, setResult] = useState(null);
    console.log("data", data);

    if(!data) {
      return
    }

    data.find(item => +item.id === +id)
      .then(res => setResult(res))

    console.log(result)
    return result
}