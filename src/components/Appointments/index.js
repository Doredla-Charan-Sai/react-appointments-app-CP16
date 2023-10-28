// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {titleIp: '', dateIp: '', appointmentsList: [], isStarred: false}

  onType = event => {
    this.setState({titleIp: event.target.value})
  }

  onSelect = event => {
    this.setState({dateIp: event.target.value})
  }

  onStar = uniqueId => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each =>
        each.id === uniqueId ? {...each, isFavorite: !each.isFavorite} : each,
      ),
    }))
  }

  onAdd = event => {
    event.preventDefault()
    const {titleIp, dateIp} = this.state
    if (titleIp !== '' && dateIp !== '') {
      this.setState(prevState => ({
        appointmentsList: [
          ...prevState.appointmentsList,
          {id: uuidv4(), title: titleIp, date: dateIp, isFavorite: false},
        ],
        titleIp: '',
        dateIp: '',
      }))
    }
  }

  onClickStarred = () => {
    this.setState(prevState => ({
      isStarred: !prevState.isStarred,
    }))
  }

  render() {
    const {titleIp, dateIp, appointmentsList, isStarred} = this.state
    const getStarredList = appointmentsList.filter(
      each => each.isFavorite === true,
    )
    return (
      <div className="bg-cont">
        <div className="card-cont">
          <div className="content-cont">
            <form className="form" onSubmit={this.onAdd}>
              <h1 className="main-head">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                onChange={this.onType}
                value={titleIp}
                placeholder="Title"
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                id="date"
                type="date"
                onChange={this.onSelect}
                value={dateIp}
              />
              <button type="submit" className="btn-add">
                Add
              </button>
            </form>
            <img
              className="side-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="head-star-cont">
            <h1 className="main-head">Appointments</h1>
            <button
              type="button"
              className="star-btn"
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="list-cont">
            {((getStarredList.length === 0 && isStarred === true) ||
              isStarred === false) &&
              appointmentsList.map(eachItem => (
                <AppointmentItem
                  details={eachItem}
                  onColored={this.onStar}
                  key={eachItem.id}
                />
              ))}
            {getStarredList.length !== 0 &&
              isStarred === true &&
              getStarredList.map(eachItem => (
                <AppointmentItem
                  details={eachItem}
                  onColored={this.onStar}
                  key={eachItem.id}
                />
              ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
