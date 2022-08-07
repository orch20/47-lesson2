import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
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
    try {
      const { photos } = await ImageService.getImages(query, page)
      this.setState(prevState => ({
        images: [...prevState.images, ...photos]
      }))
     
    } catch (error) {
      console.log(error);
    }
  };
  onHandleSubmit = (value) => {
    if (value === this.state.query) {
      return;
    }  
    this.setState({
      query: value,
      page: 1,
      images: [],
    }); 
  }
  
  render() {
    console.log(this.state.images)
    const { images } = this.state;
    return (
      <>
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Grid>{images.length > 0 && images.map(({ id, avg_color, alt, src: { large } }) => (<GridItem key={id}><CardItem color={avg_color}><img src={large} alt={alt} /></CardItem></GridItem>))}</Grid>
      </>
    );
  }
}
