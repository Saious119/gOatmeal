//file written by Andy Mahoney
//last modified 10/20/19

/*
function post(props){
    return(
        <li key=postNum>

        </li>
    )
}
*/
class post extends React.component{
    constructor(props){
        super(props);
        this.state = {
            image: "noImage.png",
            desc: "No Description Provided by User",
            tag: [Array(1).fill(null)],
        };
    }
    renderPost(i){
        return (
            <button className="post" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }
}
class home extends React.component{
    renderPost(i){
        return (
            <Post 
                value={this.props.post[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
    render(){
        return(
            <div className="home">
                <div>{posts}</div>
            </div>
        );
    }
}

//---------------------------------------------------------------------------------

ReactDOM.render(<home />, document.getElementById("root"));