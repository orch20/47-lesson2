import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  }
  onHandleInput = (e) => {
    const { value } = e.currentTarget;
    this.setState(
      {
        query: value.toLowerCase().trim()
      }
    )
  }
  
  onHandleSubmit = (event) => {
    event.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
    this.setState(
      {
        query: ""
      }
    )
  }
  
  render() {
    const { query } = this.state;
    const { onHandleInput, onHandleSubmit } = this;
    return (<SearchFormStyled onSubmit={onHandleSubmit}>
      <FormBtn type='submit'>
        <FiSearch size="16px"/>
      </FormBtn>
      <InputSearch placeholder='Що ви хочете знайти?' name='search' required value={query} autoFocus onChange={onHandleInput}/>
    </SearchFormStyled>)
  }
}

