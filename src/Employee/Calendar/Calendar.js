import React, { Component } from 'react';
import './Calendar.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import NavBar from './../NavBar/NavBar'

class Calendar extends Component {
    constructor() {
        super()
    }


    render() {
        return (
            <div className='container'>
                <NavBar />
                <InfiniteCalendar
                    width={311}
                    height={200}
                    disabledDays={[0, 6]}
                    displayOptions={{
                        layout: 'portrait',
                        showOverlay: false,
                        shouldHeaderAnimate: false
                    }}
                    className={'Calendar'}
                />
                <div className='all_requests'>
                    <div className='title'>All Requests</div>
                    <div className='content'>Vacation: 12/5 - 12/7 APPROVED</div>
                    <div className='content'>Doctor's Appointment: 12/3 DENIED</div>
                    <div className='content'>Personal Day: 12/25 DENIED</div>
                </div>
            </div>

        )
    }
}

export default Calendar;