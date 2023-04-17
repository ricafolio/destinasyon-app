export default function StarIcon({ rating, totalRatings } : { rating: number, totalRatings: number }) {
  const maxRating = 5.0 // or 10.0
  const actualRating = rating ? rating : 0
  const ratingPercentage = (actualRating / maxRating) * 100

  return (
    <div className="flex items-center mb-1">
      <div className="ratings-wrapper">
        <div className="empty-stars"></div>
        <div className="filled-stars" style={{ width: `${ratingPercentage}%` }}></div>
      </div>
      <div className="text-gray-500 text-sm ml-1">
        ({totalRatings ? totalRatings : 0})
      </div>
    </div>
  )
}