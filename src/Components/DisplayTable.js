import React, { Component } from 'react';
import Tabletop from 'tabletop';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

class DisplayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  // Get sheet data
  componentDidMount() {
    Tabletop.init({
      key: '16voEpR2yaMY8Ap4y0lwg3xbHgYCcVvhaX_PUnQAn15c',
      callback: googleSheetData => {
        this.setState({
          data: googleSheetData
        });
      },
      simpleSheet: true
    });
  }

  // Calculate average of given 'columnName'
  getAverage = columnName => {
    return (this.getSumValue(columnName) / this.state.data.length).toFixed(2);
  }

  // Calculate sum of given 'columnName'
  getSumValue = (columnName) => {
    return this.state.data.map(item => parseInt(item[columnName] || 0))
      .reduce((total, value) => total + parseInt(value), 0);
  }

  render() {
    return (
      <div className="container mt-6">
        <div className="row">
          <div className="col-md-4">
            <Alert variant="info">
              Total Record : {this.state.data.length}<br />
              <a href="https://docs.google.com/spreadsheets/d/16voEpR2yaMY8Ap4y0lwg3xbHgYCcVvhaX_PUnQAn15c/pubhtml">Edit Document</a>
            </Alert>
          </div>
        </div>

        {/* Render table */}
        {
          this.state.data.length ? (

            <Table striped bordered hover variant="dark">
              
              <thead>
                <tr>
                  <th>Name </th>
                  <th>Age</th>
                  <th>Salary</th>
                  <th>Expence</th>
                  <th>Saving</th>
                </tr>
              </thead>
              <tbody>

                {
                  this.state.data.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data['Name']}</td>
                        <td>{data['Age']}</td>
                        <td>{data['Salary'] || 0}</td>
                        <td>{data['Expence'] || 0}</td>
                        <td>{(data['Salary'] - data['Expence']) || 0}</td>
                      </tr>
                    )
                  })
                }

                {/* Display Calculation  */}
                {
                  <tr>
                    <td><b>Calculation</b></td>
                    <td>
                      <b>Max Age:</b> {Math.max.apply(Math, this.state.data.map(item => item.Age))}
                      <br />
                      <b>Min Age:</b> {Math.min.apply(Math, this.state.data.map(item => item.Age))}
                    </td>
                    <td> <b>Total Salary</b> : {this.getSumValue('Salary')}</td>
                    <td> <b>Average: </b> {this.getAverage('Expence')}</td>
                  </tr>
                }
              </tbody>
            </Table>) :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
        }
      </div>
    );
  }
}

export default DisplayTable;