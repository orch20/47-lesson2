import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: 'cat',
    page: 1,
    images: [],
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }
  getImages = async (query, page) => {
    console.log(query, page);
  };

  render() {
    return (
      <>
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
        <SearchForm />
      </>
    );
  }
}
