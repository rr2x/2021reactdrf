import React, { Component } from 'react'
import Wrapper from '../Wrapper'
import axios from 'axios'
import { Order } from '../../classes/orders'
import { Link } from 'react-router-dom'
import Paginator from '../components/Paginator'

export default class Orders extends Component {
  state = {
    order: []
  }

  page = 1;
  last_page = 0;

  componentDidMount = async () => {
    try {

      const ordersCall = await axios.get(`orders?page=${this.page}`)

      this.setState({
        order: ordersCall.data.data.data
      })

      this.last_page = ordersCall.data.data.meta.last_page;

    } catch (err) {
      console.log(err.response);
      // todo: redirect to login if forbidden
    }
  }

  handlePageChange = async (page: number) => {
    this.page = page;
    await this.componentDidMount()
  }

  handleExport = async () => {
    const response = await axios.get('export', {responseType: 'blob'})
    const blob = new Blob([response.data], {type: 'text/csv'})
    const downloadUrl = window.URL.createObjectURL(response.data)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = 'orders.csv'
    link.click()
  }

  render() {
    return (
      <Wrapper>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <a onClick={this.handleExport} className="btn btn-sm btn-outline-secondary">Export</a>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.order.length > 0 ?
                  this.state.order.map((o: Order)=> {
                    return (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.first_name} {o.last_name}</td>
                        <td>{o.email}</td>
                        <td>{o.total}</td>
                        <td>
                          <div className="btn-group mr-2">
                            <Link to={`/orders/${o.id}`} className="btn btn-sm btn-outline-secondary">View</Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                  : null
              }
            </tbody>
          </table>
        </div>

        <Paginator lastPage={this.last_page} handlePageChange={this.handlePageChange} />
      </Wrapper>
    )
  }
}
