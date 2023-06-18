import React, { useState } from "react";
import { BsChevronUp, BsChevronDown, BsTrash } from "react-icons/bs";
import { TfiPencil } from "react-icons/tfi";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import DeleteModal from "./DeleteModal";

export interface Celebrity {
  id: number;
  first: string;
  last: string;
  dob: string;
  description: string;
  picture: string;
  country: string;
  gender: string;
  email: string;
  age: number;
}

export interface AccordionProps {
  celebrity: Celebrity;
  handleDelete: (id: number) => void;
  handleSave: (data: Celebrity) => void;

  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Accordion = ({
  activeIndex,
  setActiveIndex,
  handleSave,
  handleDelete,

  celebrity,
}: AccordionProps) => {
  const [edit, setEdit] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState<Celebrity>(celebrity);
  const [isModified, setIsModified] = useState(false);

  const handleSetIndex = (index: number) => {
    if (edit) return;
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    setIsModified(true);
  };
  console.log(edit, "edit");
  return (
    <div className="p-3 m-2  border border-gray-300 w-1/2 rounded-md">
      <div
        onClick={() => handleSetIndex(formData?.id)}
        className="flex  justify-between cursor-pointer "
      >
        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 overflow-hidden">
            <img
              src={formData?.picture}
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-black font-bold ml-2">
            {formData?.first} {formData?.last}
          </div>
        </div>
        <div className="flex items-center justify-center">
          {activeIndex === formData?.id ? (
            <BsChevronUp className="w-4" />
          ) : (
            <BsChevronDown className="w-4" />
          )}
        </div>
      </div>

      {activeIndex === formData?.id && (
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSave(formData);
            setEdit(false);
          }}
        >
          <div className=" md:grid md:grid-cols-3 gap-16 ">
            <div className="">
              <label htmlFor="age" className="block  text-gray-500 font-normal">
                Age:
              </label>
              <div className="flex flex-row justify-center items-center">
                <input
                  type="number"
                  id="age"
                  className={`rounded w-full outline-none p-1 ${
                    edit && "border border-gray-300 rounded-xl"
                  } `}
                  name="age"
                  value={formData?.age}
                  readOnly={!edit}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <span className="ml-1">Years</span>
              </div>
            </div>

            <div className="">
              <label
                htmlFor="gender"
                className="block  text-gray-500 font-normal"
              >
                Gender:
              </label>
              <select
                id="gender"
                className={`rounded w-full outline-none p-1 ${
                  edit && "border border-gray-300 rounded-xl"
                } `}
                value={formData?.gender}
                disabled={!edit}
                onChange={(e) => handleChange(e)}
                name="gender"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
                <option value="rather-not-say">Rather not to say</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="">
              <label
                htmlFor="country"
                className="block  text-gray-500 font-normal"
              >
                Country:
              </label>
              <input
                type="text"
                id="country"
                required
                readOnly={!edit}
                className={`rounded w-full outline-none p-1 ${
                  edit && "border border-gray-300 rounded-xl"
                } `}
                name="country"
                value={formData?.country}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block  text-gray-500 font-normal"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={formData?.description}
              readOnly={!edit}
              className={`rounded w-full outline-none resize-none p-1 ${
                edit && "border border-gray-300 rounded-md"
              } `}
              name="description"
              onChange={(e) => handleChange(e)}
              rows={3}
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 ">
            {edit ? (
              <>
                <MdOutlineCancel
                  className="w-4 text-red-400 cursor-pointer"
                  onClick={() => {
                    setFormData(celebrity);
                    setEdit(false);
                  }}
                />

                <button
                  className="w-4 text-green-400 cursor-pointer"
                  type="submit"
                  disabled={!isModified}
                >
                  <IoIosCheckmarkCircleOutline />
                </button>
              </>
            ) : (
              <>
                <BsTrash
                  className="w-4 text-red-400 cursor-pointer"
                  onClick={() => setIsDeleteModalOpen(true)}
                />
                {formData?.age > 18 && (
                  <TfiPencil
                    className="w-4 text-blue-400 cursor-pointer"
                    onClick={() => setEdit(true)}
                  />
                )}
              </>
            )}
          </div>
        </form>
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={() => {
          handleDelete(formData?.id), setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default Accordion;
