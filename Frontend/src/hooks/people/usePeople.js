import { useEffect, useState } from "react";
import { fetchPopularPeople } from "../../services/peopleService";

export const usePeople = () => {

  const [people, setPeople] = useState([]);

  useEffect(() => {

    fetchPopularPeople().then(setPeople);

  }, []);

  return people;
};