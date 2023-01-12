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
import Loader from '../Loader';
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
  };

  handleSerch = ({ query }) => {
    this.setState({ query, page: 1 });
  };

  scrollNextPage = () => {
    setTimeout(() => {
      window.scroll(
        {
          behavior: 'smooth',
          top: document.documentElement.scrollHeight,
        }
      )
    },
        GALLERY_SCROLL_TIMEOUT);
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
      
      //==========toast when nothing found=====================
      if (!imagesInFetch) {
        toast.info(`No images found!`);
        this.setState({
          status: mashineStatus.SUCCESSFULLY,
          loadMoreBtnVisibility: false,
        });
        return;
      }
      //========================================================
      // ====================== Toast.info =====================
      const imagesPerPage = ApiOptions.per_page;
      const totalImages = data.totalHits;

      const imagesLeft =
        imagesInFetch === imagesPerPage
          ? totalImages - imagesPerPage * page
          : 0;

      toast.info(`Total found: ${totalImages}. Images left: ${imagesLeft}.`);
      //==========================================================
      const { searchData } = this.state;
      const url = await hits[0].webformatURL;
      
        this.setState({
          searchData: [...searchData, ...hits],
          firstImgUrlInFetch: url,
          status: mashineStatus.SUCCESSFULLY,
          loadMoreBtnVisibility: imagesInFetch >= imagesPerPage ? true : false,
          page: this.state.page + 1,
        });this.scrollNextPage()
    } catch ({ code, message }) {
      // =============== Toast when have error =================
      toast.error(`${code}: ${message}`);
      this.setState({
        status: mashineStatus.SUCCESSFULLY,
        error: `${code}: ${message}`,
      });
      //==========================================================
    }
  };

  componentDidUpdate(_, prevState) {
    const { query: currentSearch } = this.state;
    const prevSearch = prevState.query;

    if (prevSearch !== currentSearch) {
      this.setState({
        searchData: [],
        status: mashineStatus.IDLE,
      });
      this.getImages();
    }
  }

  render() {
    const { status, searchData, loadMoreBtnVisibility } = this.state;

    return (
      <>
        <GlobalStyle />
        <AppStyled>
          <Searchbar onSubmit={this.handleSerch} />

          {status === mashineStatus.IDLE && (
            <IdleScreen>{message.IDLE}</IdleScreen>
          )}

          {status === mashineStatus.LOADING && <Loader />}

          <ImageGallery searchData={searchData} />

          {status === mashineStatus.SUCCESSFULLY && loadMoreBtnVisibility && (
            <Button onClick={this.getImages} />
          )}
          <ToastContainer />
        </AppStyled>
      </>
    );
  }
}
