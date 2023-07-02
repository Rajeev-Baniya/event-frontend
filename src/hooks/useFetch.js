import { useEffect, useState } from "react";
import axios from "axios";
import http from "../services/httpService";

const useFetch = (url) => {
  const tokenKey = "token";
  const getJwt = () => {
    return localStorage.getItem(tokenKey);
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await http.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  http.setJwt(getJwt());

  return { data, loading, error, reFetch };
};

export default useFetch;
