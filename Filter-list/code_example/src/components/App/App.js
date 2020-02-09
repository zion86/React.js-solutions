import React, { Component } from 'react';
import { Input } from '../Input/';
import { RenderList } from '../RenderList/';
import { Button } from '../Button/';
import './App.css';

export class App extends Component {
  state = {
    query: '',
    list: [
      { id: 'a', name: 'Ford' },
      { id: 'b', name: 'Audi' },
      { id: 'c', name: 'Mercedes' },
      { id: 'd', name: 'Ferrari' },
      { id: 'e', name: 'Volkswagen' },
    ],
  };

  onChange = ({ target: { value } }) => {
    this.setState(() => ({ 
      query: value
    }));
  };

  onCancel = () => {
    this.setState(() => ({
      query: ''
    }));
  };

  filterList = query => ({ name }) => name.toLowerCase().includes(query.toLowerCase());

  render() {
    const { query, list } = this.state;
    const result = list.filter(this.filterList(query));
    
    return (
      <div className={'app'}>
        {
          query.length === 0
            ? <div className={'form'}>
                <Input onChange={ this.onChange } value={ query } placeholder={ 'Search...' } />
              </div>
            : <div className={'form'}>
                <Input onChange={ this.onChange } value={ query } autoFocus={ true } />
                <Button onClick={ this.onCancel } />
              </div>
        }

        {
          result.length === 0 
            ? <p>Results not found</p>
            : <RenderList list={ result } />
        }
      </div>
    );
  };
};