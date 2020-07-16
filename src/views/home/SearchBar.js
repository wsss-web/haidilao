import React from 'react';
import { SearchBar } from 'antd-mobile';

class SearchBarExample extends React.Component {
  render() {
    return (<div>
      <SearchBar 
      className="searchbar" 
      placeholder="搜索商品" 
      disabled maxLength={8}
      style={{ height: "35px",
        borderRadius: "20px",
        backgroundColor: "white",
        margin: "20px 10px 0 10px"}}
      ></SearchBar>
    </div>);
  }
}

export default SearchBarExample;
