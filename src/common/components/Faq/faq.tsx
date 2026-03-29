import { useEffect, useState } from "react";
export const FavoritesPage = () => {
  const [item, setItem] = useState(5);
  const [isStart, setIsStart] = useState(false);
  const [data, setData] = useState<Array<{ ID: string; Name: string }>>([]);
  const [isLoad, setIsLoad] = useState(false);
  console.log("data ", data)

  const handlerItem = () => {
    if (isStart) return;
    setIsStart(true);
  };

  const featchData = async () => {
    try {
      setIsLoad(true);
      const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
      const resData = await res.json();
      setIsLoad(false);
      setData(Object.values(resData.Valute));
    } catch (error) {
       setIsLoad(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isStart) return;
    const id = setInterval(() => {
      setItem((prev) => {
        if (prev === 0) {
          setIsStart(false);
          featchData();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [isStart]);

  return (
    <div>
     
      <div className="">
        <h2>
          Total <span>{item}</span>
        </h2>
        {item > 0 && <button onClick={handlerItem}>click</button>}
        {isLoad && <div> Loading ...</div>}
        <ul>
        {data.length !== 0 && data?.map(el=>(
          <li key={el.ID}>{el.Name}</li>
        ))}
        </ul>
      </div>
    </div>
  );
};
