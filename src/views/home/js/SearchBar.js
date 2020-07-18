import React from 'react';
import { SearchBar } from 'antd-mobile';

class SearchBarExample extends React.Component {
  render() {
    return (
      <div>
        <SearchBar 
        className="searchbar" 
        placeholder="搜索商品"
        maxLength={8}
        style={{ height: "35px",
          borderRadius: "20px",
          backgroundColor: "white",
          margin: "20px 20px 0 20px"
        }}
        ></SearchBar>
      </div>
    );
  }
}

export default SearchBarExample;
