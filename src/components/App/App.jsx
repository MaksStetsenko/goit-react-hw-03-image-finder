import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  mashineStatus,
  GALLERY_SCROLL_TIMEOUT,
  ApiOptions,
} from '../../services/options';

import { fetchData } from '../../services';
import { message } from '../../services/messages';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Loader from 'components/Loader';
import IdleScreen from '../IdleScreen';
import Button from '../Button';

import GlobalStyle from '../GlobalStyle';
import AppStyled from './App.styled';


export class App extends PureComponent {
  static propTypes = {
    searchString: PropTypes.string,
  };

  state = {
    query: '',
    page: 1,
    searchData: [],
    firstImgUrlInFetch: '',
    status: mashineStatus.IDLE,
    error: '',
    loadMoreBtnVisibility: false,
    modalIsOpen: false,
  };

  handleSerch = ({ query }) => {
    this.setState({ query });
  };

  scrollNextPage = () => {
    setTimeout(() => {
      const { firstImgUrlInFetch } = this.state;
      const url = firstImgUrlInFetch;
      const firstImg = document.querySelector(`img[src="${url}"]`);

      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: firstImg.offsetTop - 84,
      });
    }, GALLERY_SCROLL_TIMEOUT);
  };

  nextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getImages = async () => {
    const { page, query } = this.state;

    this.setState({
      status: mashineStatus.LOADING,
    });

    try {
      const data = await fetchData(query, page);
      const hits = await data.hits;
      const imagesInFetch = hits.length;

      // NoImages found check
      if (!imagesInFetch) {
        toast.info(`No images found!`);
        this.setState({
          status: mashineStatus.SUCCESSFULLY,
          loadMoreBtnVisibility: false,
        });
        return;
      }

      // Get url for the first image of new page
      const url = await hits[0].webformatURL;

      // Calculating Total images found and left images in base
      const imagesPerPage = ApiOptions.per_page;
      const totalImages = data.totalHits;

      const imagesLeft =
        imagesInFetch === imagesPerPage
          ? totalImages - imagesPerPage * page
          : 0;

      // Making a Toast :)
      toast.info(`Total found: ${totalImages}. Images left: ${imagesLeft}.`);

      this.setState(({ searchData }) => ({
        searchData: [...searchData, ...hits],
        firstImgUrlInFetch: url,
        status: mashineStatus.SUCCESSFULLY,
        loadMoreBtnVisibility: imagesInFetch >= imagesPerPage ? true : false,
      }));
    } catch ({ code, message }) {
      toast.error(`${code}: ${message}`);
      this.setState({
        status: mashineStatus.SUCCESSFULLY,
        error: `${code}: ${message}`,
      });
    }
  };

  async componentDidUpdate(_, prevState) {
    // Reset state when have new query and getting images
    const { page, query: currentSearch } = this.state;
    const prevSearch = prevState.query;

    if (prevSearch !== currentSearch) {
      this.setState({
        query: currentSearch,
        page: 1,
        searchData: [],
      });

      await this.getImages();
    }

    // Check state for changing page number
    if (prevState.page !== page) {
      await this.getImages();

      // Scrolling next page func
      this.scrollNextPage();
    }
  }

  render() {
    const { status, searchData, loadMoreBtnVisibility } = this.state;

    return (
      <>
        <GlobalStyle />
        <AppStyled>
          <Searchbar onSubmit={this.handleSerch} />

          <ImageGallery searchData={searchData} />

          {status === mashineStatus.IDLE && (
            <IdleScreen>{message.IDLE}</IdleScreen>
          )}

          {status === mashineStatus.LOADING && <Loader />}

          {/* Place for render ERROR container if it need */}
          {/* {status === mashineStatus.ERROR && <Modal>{error}</Modal>} */}

          {status === mashineStatus.SUCCESSFULLY && loadMoreBtnVisibility && (
            <Button onClick={this.nextPage} />
          )}

          <ToastContainer />
        </AppStyled>
      </>
    );
  }
}