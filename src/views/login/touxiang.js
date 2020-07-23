import React from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './touxiang.css'
import axios from 'axios'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class Avatar extends React.Component {
  state = {
    loading: false
  };
  componentDidMount(){
	  var data = {
		  userId: localStorage.getItem('userId'),
	  }
	  console.log(data)
	  var that = this
	 axios.post('http://localhost:3001/tousel',{
		 data: data
	 })
		.then(
			function(res){
				that.setState({
					imageUrl: res.data.avatar
				})
			},
			
			function(err){
				console.log(err)
			}
		)
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
		console.log(6666)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => 
        this.setState({
          imageUrl,
          loading: false
        }),
      );
	  setTimeout(() => {
		  var data = {
			  userId: localStorage.getItem('userId'),
			  imgurl: this.state.imageUrl
		  }
		  console.log(data)
		  axios.post('http://localhost:3001/touset', {
		  		  data: data
		  })
		  		.then(
		  			function(res){
		  				console.log(res)
		  			},
		  			function(err){
		  				console.log(err)
		  			}
		  		)
	  },1000)
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
		action="http://localhost:3001/newconn"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' , borderRadius: '50%'}} /> : uploadButton}
      </Upload>
    );
  }
}
