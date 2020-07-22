import React from "react";
import MyPopup from "../home/js/Popup.js"
export default class Confirm extends React.Component{ // eslint-disable-next-line
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <div>
                <MyPopup></MyPopup>
            </div>
        )
    }
}