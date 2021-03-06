import React, { Component } from 'react'
import Wrapper from '../Wrapper'
import c3 from 'c3'
import axios from 'axios'

class Dashboard extends Component {

  componentDidMount = async () => {
    try {
      let chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [
            ['x'],
            ['Sales'],
          ],
          types: {
            Sales: 'bar'
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d'
            }
          }
        }
      })

      const response = await axios.get('chart')

      const records: {date: string, sum: number}[] = response.data.data

      chart.load({
        columns: [
          ['x',...records.map(r=>r.date)],
          ['Sales',...records.map(s=>s.sum)],
        ]
      })
    } catch (err) {
      console.log (err.response)
    }
  }

  render() {
    return (
      <Wrapper>
        <h2>Daily Sales</h2>

        <div id="chart" />
      </Wrapper>
    )
  }
}

export default Dashboard;