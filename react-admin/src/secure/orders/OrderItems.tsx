import React, { Component } from 'react'
import Wrapper from '../Wrapper'
import axios from 'axios';
import { Order } from '../../classes/orders';
import { OrderItem } from '../../classes/order_item';

export default class OrderItems extends Component<{match: any}> {

  state = {
    order_items: []
  }

  id = 0;

  componentDidMount = async () => {
    this.id = this.props.match.params.id;

    const response = await axios.get(`orders/${this.id}`)

    const order: Order = response.data.data

    this.setState({
      order_items: order.order_items
    })
  }

  render() {
    return (
      <Wrapper>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>Product Title</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.order_items.length > 0 ?
                  this.state.order_items.map((oi: OrderItem)=> {
                    return (
                      <tr key={oi.id}>
                        <td>{oi.id}</td>
                        <td>{oi.product_title}</td>
                        <td>{oi.price}</td>
                        <td>{oi.quantity}</td>
                      </tr>
                    )
                  })
                  : null
              }
            </tbody>
          </table>
        </div>
      </Wrapper>
    )
  }
}
