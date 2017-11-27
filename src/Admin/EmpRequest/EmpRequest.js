import React, { Component } from 'react';
import './EmpRequest.css';
import NavBar from '../../Employee/NavBar/NavBar.js'; 
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import { connect } from 'react-redux';


class EmpRequests extends Component {
    constructor() {
        super()
        this.state = {
            requests: [],
            value: 0,
            approval:"",
            greyed_out: false,
            select: false,
            requestid:0
        }
        this.approveSubmit = this.approveSubmit.bind(this);
        // this.greyOut = this.greyOut.bind(this);
       
    }

    componentDidMount() {
        axios.get('/api/admin/get_requests').then(response => {
            this.setState({
                requests: response.data
            })
        })
    }

    approveSubmit(requestid) {
        const body = {
            approval: this.state.approval,
            requestid
        }
        console.log(body)
        axios.put('/api/admin/approval', body).then(response => {
            console.log("hi")
            
        })
    }

    // greyOut(){
    //     this.setState({
    //         greyed_out: true
    //     })
    // }

 

    render() {
        const requestsDisplayed = this.state.requests.map((requests, i) => {
            const start_date = requests.start_date.replace(/T.*/, '')
            const end_date = requests.end_date ? requests.end_date.replace(/T.*/, '') : 'N/A'
            return (
                // <TableRow>
                //   <TableRowColumn>{requests.start_date}</TableRowColumn>
                //   <TableRowColumn>{requests.end_date}</TableRowColumn>
                //   <TableRowColumn>{requests.reason}</TableRowColumn>
                //   <TableRowColumn>{requests.approval}</TableRowColumn>
                // </TableRow>
                <div key={i} className={this.state.greyed_out ? 'greyed_out' : 'purple_box'}>
                    <div className='requests'>

                        <div>
                            <div className='requests_img'><img src={requests.img} alt="hello"/></div>
                            <div className='requests_name'> {requests.user_name}</div>
                            <div className='dates'>
                                <div> {start_date} to <br></br>{end_date}</div>
                                <div className='requests_reason'> {requests.reason}</div>
                            </div>
                        </div>

                        <div className='approval'>
                            <select onChange={(e)=>this.setState({
                                approval: e.target.value})}>
                                <option value="Select">Select</option>
                                <option value="Approved">Approved</option>
                                <option value="Denied">Denied</option>
                            </select>

                            <button className='submit_btn' onClick={()=>{this.approveSubmit(requests.id)}}>SUBMIT</button>
                        </div>

                    </div>
                </div>
            )
        })
        return (
            <div className='background'>
                <NavBar />
                <div>
                    {/* <Table>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn colSpan="4">Employee Requests</TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn>Start Date</TableHeaderColumn>
                                    <TableHeaderColumn>End Date</TableHeaderColumn>
                                    <TableHeaderColumn>Reason</TableHeaderColumn>
                                    <TableHeaderColumn>Approval</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                            {requestsDisplayed}
                            </TableBody>
                        </Table> */}
                </div>
                <div className='requests_container'>
                    <div className='requests_title'>Employee Requests</div>
                    {requestsDisplayed}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("state from private", state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(EmpRequests);