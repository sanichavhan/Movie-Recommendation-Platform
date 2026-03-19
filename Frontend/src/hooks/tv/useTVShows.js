import { useEffect, useState } from "react";
import { fetchTrendingTV } from "../../services/tvService";

export const useTVShows = () => {

  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {

    fetchTrendingTV().then(setTvShows);

  }, []);

  return tvShows;
};