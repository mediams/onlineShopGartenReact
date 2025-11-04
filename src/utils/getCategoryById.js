import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "./fetchClient";
import {useState} from "react";

export const getCategoryById = (id) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    const [data, setData] = useState(null);

    dispatch(fetchCategories());

    if(!categories) {
      return
    }

    categories.find(item => +item.id === +id)
    .then(res => {
      setData(res)
    });

    return JSON.parse(data);
}