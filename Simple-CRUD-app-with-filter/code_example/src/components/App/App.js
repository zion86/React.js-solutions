import React, {Component} from 'react';
import './App.css';

export class App extends Component {
  state = {
    counter: null,
    list: [],
    currentValue: '',
    filterTypes: ['all', 'not done', 'done'],
    filter: 'all',
    editMode: null,
  };

  onChangeInput = ({target: {value}}) => {
    this.setState(() =>({
      currentValue: value
    }));
  };

  onSubmit = () => {
    this.setState(({counter, list, currentValue}) => ({
      counter: ++counter,
      list: [
        ...list,
        {id: counter, todo: currentValue, done: false},
      ],
      currentValue: '',
    }));
  };

  onDeleteTodo = id => {
    this.setState(({list}) => ({
      list: list.filter(todo => todo.id !== id)
    }));
  };

  onChangeCheckbox = id => {
    this.setState(({list}) => ({
      list: list.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo)
    }));
  };

  filterResult = type => {
    this.setState(() => ({
      filter: type
    }));
  };

  onEditMode = ({todo, id}) => {
    this.setState(() => ({
      editMode: {todo, id},
      currentValue: todo
    }));
  };

  onSaveChanges = id => {
    this.setState(({list, currentValue}) => ({
      list: list.map(todo => todo.id === id ? {...todo, todo: currentValue} : todo),
      currentValue: '',
      editMode: null,
    }));
  };

  onCancelButton = () => {
    this.setState(() => ({
      currentValue: '',
      editMode: null,
    }))
  }

  render() {
    const {list, currentValue, filter, filterTypes, editMode} = this.state;
    let result = [];
    
    if (filter === 'all') result = list;
    if (filter === 'not done') result = list.filter(({done}) => !done);
    if (filter === 'done') result = list.filter(({done}) => done);

    const renderList = result.map(({id, todo, done}) => (
      <li key={id}>
        {
          editMode === null
            && 
              <>
                <input type='checkbox' onClick={() => this.onChangeCheckbox(id)} defaultChecked={done} />
                <span className='list-text' style={{textDecoration: done ? 'line-through' : 'none'}}>
                  {todo}
                </span>
                <span className='right'>
                  <button onClick={() => this.onEditMode({todo, id})}>Edit</button>
                  <button onClick={() => this.onDeleteTodo(id)}>Delete</button>
                </span>
              </>
        }
      </li>
    ));

    return (
      <div className='app'>
        <div className='input'>
          {editMode === null
            ? 
              <>
                <div className='search'>
                  <input className='text-field' type='text' onChange={this.onChangeInput} value={currentValue} placeholder='Please add Todo...' />
                  {currentValue.length > 3 && <button onClick={this.onSubmit}>ADD</button>}
                </div>
                
                <div className='filter'>
                  {filterTypes.map(type => (
                    <button key={type} onClick={() => this.filterResult(type)}>{type}</button>
                  ))}
                </div>
              </>
            :
              <div className='edit-mode'>
                <input  className='text-field' type='text' onChange={this.onChangeInput} value={currentValue} />
                <button onClick={() => this.onCancelButton()}>Cancel</button>
                <button onClick={() => this.onSaveChanges(editMode.id)}>Save</button>
              </div>
          }
        </div>

        <ul>
          { renderList.length === 0 
              ? <li style={{justifyContent: 'center'}}>please add Todo</li> 
              : editMode === null
                ? renderList 
                : <li>Edit mode: {currentValue}</li> }
        </ul>
      </div>
    );
  };
};