import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isVisible: false,
    isLoading: false,
    isEmpty: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }
  getImages = async (query, page) => {
    this.setState({isLoading: true})
    try {
      const { photos, total_results, per_page, page: currentPage } = await ImageService.getImages(query, page)
      if (photos.length === 0) {
        this.setState({isEmpty: true})
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        isVisible: currentPage < Math.ceil(total_results/per_page),
      }))
    } catch (error) {
      console.error(error);
      this.setState({error: error.message})
    }
    finally {
      this.setState({isLoading:false})
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
      isVisible: false,
      isEmpty: false,
      error: null,
    }); 
  }
  
  ohHandleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))

  }

  render() {
    console.log(this.state.images)
    const { images, isVisible, isLoading, isEmpty, error } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        {isEmpty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
        <Grid>{images.length > 0 && images.map(({ id, avg_color, alt, src: { large } }) => (<GridItem key={id}><CardItem color={avg_color}><img src={large} alt={alt} /></CardItem></GridItem>))}</Grid>
        {isVisible && <Button onClick={this.ohHandleLoadMore} disabled={isLoading} >{ isLoading ? "Loading..." : "Load more"}</Button>}
        {error && <Text textAlign="center">Sorry. {error} 😭</Text>}
      </>
    );
  }
}
