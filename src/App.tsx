import { useEffect, useState } from "react";
import Accordion, { Celebrity } from "./components/Accordian";
import celebrities from "../src/celebritiesdata/celebrities.json";
import moment from "moment";

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [celebData, setCelebData] = useState<Celebrity[]>([]);

  useEffect(() => {
    const updatedCelebData = celebrities.map((celebrity) => ({
      ...celebrity,
      age: moment().diff(celebrity.dob, "years"),
    }));
    setCelebData(updatedCelebData);
  }, [celebrities]);

  const handleDelete = (id: number) => {
    const data = celebData.filter((celeb) => {
      return celeb.id !== id;
    });
    setCelebData(data);
  };

  const handleSave = (data: Celebrity) => {
    setCelebData((prevCelebData) => {
      const updatedData = prevCelebData.map((celebrity) => {
        if (celebrity.id === data.id) {
          return data;
        }
        return celebrity;
      });
      return updatedData;
    });
  };

  return (
    <>
      <div className="w-1/2 mx-auto border border-gray-300 mt-2 rounded-lg ">
        <div className="relative  flex items-center w-full h-8 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid  place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 "
            type="text"
            id="search"
            placeholder="Search user"
          />
        </div>
      </div>
      {celebData &&
        celebData?.map((celebrity) => {
          return (
            <div
              className="flex flex-col justify-center items-center"
              key={celebrity?.id}
            >
              <Accordion
                celebrity={celebrity}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                handleDelete={handleDelete}
                handleSave={handleSave}
              />
            </div>
          );
        })}
    </>
  );
};
export default App;
