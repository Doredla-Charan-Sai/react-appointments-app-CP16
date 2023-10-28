// Write your code here
import './index.css'
import {format} from 'date-fns'

// console.log(format(new Date(2021, 19, 07), 'dd MMMM yyyy, EEEE')) // 19 July 2021, Monday

const AppointmentItem = props => {
  const {details, onColored} = props
  const {id, title, date, isFavorite} = details
  const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const onStar = () => {
    onColored(id)
  }
  return (
    <li className="list-item">
      <div className="title-star-cont">
        <p className="title">{title}</p>
        <button
          className="star"
          onClick={onStar}
          type="button"
          data-testid="star"
        >
          {isFavorite && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="filled star"
              className="star-img"
            />
          )}
          {!isFavorite && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              alt="star"
              className="star-img"
            />
          )}
        </button>
      </div>
      <p className="date-para">Date: {formatDate}</p>
    </li>
  )
}
export default AppointmentItem
