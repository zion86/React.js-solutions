import React, { Component } from 'react';
import './App.css';

export class App extends Component {
  state = {
    list: [
      { id: 1, name: 'Maserati', model: 'Ghibli 4.7', year: 1969 },
      { id: 2, name: 'Jaguar', model: 'E-Type', year: 1961 },
      { id: 3, name: 'Shelby 427', model: 'Cobra', year: 1966 },
      { id: 4, name: 'Corvette', model: 'Sting Ray', year: 1963 },
    ],
    sort: 'none',
    sortField: '',
  };

  sortList = (value) => {
    this.setState(({ list, sort }) => ({
      sort: sort === '⇓' ? '⇑' : '⇓',
      sortField: value,
      list: list.sort((a, b) => {
        const aside = a[value];
        const bside = b[value];
        return (sort === '⇓') ? (aside < bside ? 1 : -1) : (aside > bside ? 1 : -1)
      })
    }));
  };

  render() {
    const { list, sort, sortField } = this.state;
    const keysFromList = list.map(el => Object.keys(el));
    const setKeys = new Set(...keysFromList);
    const convertToArray = [...setKeys];
    
    return (
      <>
        <h2>Click on the name of the column to sort table</h2>
        <table>
          <thead>
            <tr>
              { convertToArray.map(name => (
                <th key={name} onClick={ () => this.sortList(name) }>
                  { name.toUpperCase() } { sortField === name ? sort : null }
                </th>
              )) }
            </tr>
          </thead>
          <tbody>
            { list.map(({ id, name, model, year }) => (
              <tr key={ id }>
                <td>{ id }</td>
                <td>{ name }</td>
                <td>{ model }</td>
                <td>{ year }</td>
              </tr>
            )) }
          </tbody>
        </table>
      </>
    );
  };
};