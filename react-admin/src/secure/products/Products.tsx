import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../Wrapper'
import axios from 'axios';
import { Product } from '../../classes/product';
import Paginator from '../components/Paginator';
import Deleter from '../components/Deleter';

export default class Products extends Component {

  state = {
    products: []
  }

  page = 1;
  last_page = 0;

  componentDidMount = async () => {
    try {

      const productsCall = await axios.get(`products?page=${this.page}`)

      this.setState({
        products: productsCall.data.data.data
      })

      this.last_page = productsCall.data.data.meta.last_page;

    } catch (err) {
      console.log(err.response);
      // todo: redirect to login if forbidden
    }
  }

  handleDelete = async (id: number) => {
    this.setState({
      products: this.state.products.filter((p: Product) => p.id !== id)
    })
  }

  handlePageChange = async (page: number) => {
    this.page = page;
    await this.componentDidMount()
  }

  render() {
    return (
      <Wrapper>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="btn-toolbar mb-2 mb-md-0">
            <Link to={'/products/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.products.length > 0 ?
                  this.state.products.map((p: Product) => {
                    return (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td><img src={p.image} width="50" alt="product" /></td>
                        <td>{p.title}</td>
                        <td>{p.description}</td>
                        <td>{p.price}</td>
                        <td>
                          <div className="btn-group mr-2">
                            <Link to={`/products/${p.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                            <Deleter id={p.id} endpoint={"products"} handleDelete={this.handleDelete} />
                          </div>
                        </td>
                      </tr>
                    )
                  }) : null
              }
            </tbody>
          </table>
        </div>

        <Paginator lastPage={this.last_page} handlePageChange={this.handlePageChange} />

      </Wrapper>
    )
  }
}
