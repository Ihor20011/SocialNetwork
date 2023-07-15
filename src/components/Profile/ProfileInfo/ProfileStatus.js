import React from "react";

class ProfileStatus extends React.Component{
    state={
        editMode:false,
        status:this.props.status,
    }
    changeEditMode=()=>{
        this.setState({
            editMode:true
        })
    }
    reverseChangeMode=()=>{
        this.setState({
            editMode:false
        })
        this.props.UpdateStatusThunkCreator(this.state.status);
    }
    updatingStatus=(e)=>{
      this.setState({
        status:e.currentTarget.value
      })
    }
    componentDidUpdate(prevProps,prevState){
        
        if (prevProps.status !== this.props.status){
            this.setState({
                status:this.props.status
            })
        }
    }
    render(){
        return(
            <div>
                {!this.state.editMode&&
                <div>
                    <span  onClick={this.changeEditMode}>   {this.props.status ||"-----"}</span>
                </div>
                 }
                 {this.state.editMode&&
                 <div>
                    <input  onChange={this.updatingStatus}  autoFocus={true}  onBlur={this.reverseChangeMode}  value={this.state.status}/>
                </div>
                }
            </div>
        )
    }
}
export default ProfileStatus