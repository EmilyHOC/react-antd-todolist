import React,{ Component } from 'react'
import 'antd/dist/antd.css'
import { Input,Button ,List} from 'antd'
import store from './store/index'
import {getAddItemAction, getDeleteItemAction, getInputChangeAction} from "./store/actionCreator";

class Todolist extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handlestorechange=this.handlestorechange.bind(this);
        this.handleclick=this.handleclick.bind(this);
        store.subscribe(this.handlestorechange);

    }
    render(){
        return (
            <div style={{marginTop: '10px',marginLeft: '10px'}}>
                <div>
                    <Input value={this.state.inputValue}
                           style={{width: 300,marginRight:'10px'}}
                            onChange={this.handleInputChange}></Input>
                    <Button type="primary"
                            onClick={this.handleclick}>提交</Button>
                </div>
                <List
                    style={{marginTop: '10px',width:'300px',marginLeft:'10px'}}
                    itemLayout="horizontal"
                    dataSource={this.state.list}
                    renderItem={(item,index) => (
                        <List.Item onClick={this.handleItemDelete.bind(this,index)}>{item}</List.Item>
                    )}
                />
            </div>
        )
    }
    handleInputChange(e){
        const action = getInputChangeAction(e.target.value);
        store.dispatch(action);
    }
    handlestorechange(e){
        this.setState(store.getState());
    }
    handleclick(e){
        const action =getAddItemAction();
        store.dispatch(action);
    }
    handleItemDelete(index){
        const action=getDeleteItemAction(index);
        store.dispatch(action);

    }
}
export  default Todolist