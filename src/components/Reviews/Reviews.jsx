"use client"

import { useEffect, useState } from "react"
import s from "./Reviews.module.scss"
import RatingComponent from "../RatingComponent/RatingComponent"
import BookId from "../Cards/BookId/BookId"
import { useDispatch, useSelector } from "react-redux"
import { fetchFields } from "../../store/slice/fields-slice"
import { ChevronUp } from "lucide-react"

const Reviews = () => {
  const { fields } = useSelector((state) => state.fields)
  const [fieldDelete, setFieldDelete] = useState(true)
  const [deleteValue, setDeleteValue] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedField, setSelectedField] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFields())
  }, [dispatch])

  useEffect(() => {
    if (fields?.results && fields.results.length > 0 && !selectedField) {
      setSelectedField(fields.results[0])
    }
  }, [fields, selectedField])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleFieldSelect = (field) => {
    setSelectedField(field)
    setIsDropdownOpen(false)
  }  

  return (
    <>
      <div className={s.Block2_3_1}>
        <div className={s.BLock2_3Blocks}>
          <div className={s.Block3_3Blok1}>
            <div className={s.dropdownContainer}>
              <div className={s.dropdownHeader} onClick={toggleDropdown}>
                <span>{selectedField ? selectedField.name : "Выберите ваше футбольное поле"}</span>
                <ChevronUp className={`${s.dropdownIcon} ${isDropdownOpen ? s.rotated : ""}`} />
              </div>
              {isDropdownOpen && fields?.results && (
                <div className={s.dropdownMenu}>
                  {fields.results.map((field) => (
                    <div key={field.id} className={s.dropdownItem} onClick={() => handleFieldSelect(field)}>
                      {field.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <RatingComponent fieldId={selectedField?.id} days={7} />
            <div className={s.stats}>
              <p className={s.percentageChange} style={{ color: "#4C8E4C" }}>
                +2.1% <span>по сравнению с прошлой неделей</span>
              </p>
              <p className={s.dateRange}>Расчёт с 1 по 6 Декабря 2024</p>
            </div>
          </div>
        </div>
        {selectedField ? (
          <BookId
            fieldDelete={fieldDelete}
            setFieldDelete={setFieldDelete}
            setDeleteValue={setDeleteValue}
            key={selectedField.id}
            item={selectedField}
          />
        ) : (
          <h5 className={s.noFields}>Нет полей</h5>
        )}
      </div>
    </>
  )
}

export default Reviews

