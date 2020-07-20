import React from 'react';
import { SearchBar } from 'antd-mobile';

class SearchBarExample extends React.Component {
	constructor(props) {
	    super(props)
		this.state = {
			value: ''
		}
		this.submit = this.submit.bind(this)
	}
	submit = (a) => {
		console.log(a)
		this.setState({
			value: a
		})
	}
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
        onSubmit = {this.submit}></SearchBar>
      </div>
    );
  }
}

export default SearchBarExample;
