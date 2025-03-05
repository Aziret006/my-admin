"use client"

import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Rating from "@mui/material/Rating"
import { styled } from '@mui/material/styles'
import s from "./RatingComponent.module.scss"
import { fetchRating } from "../../store/slice/ratingSlice"

// Customize MUI Rating component to use red stars
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FF3B30',
  },
  '& .MuiRating-iconEmpty': {
    color: '#E0E0E0',
  },
})

const RatingComponent = ({ fieldId, days }) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.rating)

  useEffect(() => {
    dispatch(fetchRating({ fieldId, days }))
  }, [dispatch, fieldId, days])

  if (error) return <div className={s.error}>Error: {error}</div>
  if (!data) return null

  const ratings = {
    5: data.ratings?.five || 0,
    4: data.ratings?.four || 0,
    3: data.ratings?.three || 0,
    2: data.ratings?.two || 0,
    1: data.ratings?.one || 0,
  }

  const totalReviews = data.reviews_count || 0
  const averageRating = data.avg_rating || 0

  const getPercentage = (count) => (totalReviews ? (count / totalReviews) * 100 : 0)

  return (
    <div className={s.ratingContainer}>
      <div className={s.leftSection}>
        <div className={s.ratingScore}>{averageRating.toFixed(1)}</div>
        <StyledRating
          name="read-only"
          value={averageRating}
          precision={0.1}
          readOnly
          size="medium"
        />
        <p className={s.reviewCount}>{totalReviews} отзывов</p>
      </div>

      <div className={s.ratingBars}>
        {Object.entries(ratings)
          .sort((a, b) => b[0] - a[0])
          .map(([rating, count]) => (
            <div key={rating} className={s.ratingBar}>
              <span className={s.ratingLabel}>{rating}</span>
              <div className={s.barContainer}>
                <div
                  className={s.barFill}
                  style={{ width: `${getPercentage(count)}%` }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default RatingComponent
