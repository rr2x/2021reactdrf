import React, { Component } from 'react'
import axios from 'axios'

export default class Deleter extends Component<{id: number, endpoint: string, handleDelete: any}> {

  delete = async () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${this.props.endpoint}/${this.props.id}`);
        this.props.handleDelete(this.props.id)
      } catch (err) {
        console.log(err.response)
      }
    }
  }

  render() {
    return (
      <a href="#" className="btn btn-sm btn-outline-secondary"
        onClick={() => this.delete()}>Delete</a>
    )
  }
}
