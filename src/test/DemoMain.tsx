import React, {Component} from 'react';
import DemoSelect from "../lib/lc-select/Select";

class DemoMain extends Component {

    componentDidMount() {
        document.addEventListener('mousedown', this.click1)
    }

    click1 = () => {
        console.log('click1');
    }

    click2 = () => {
        console.log('click2');
    }

    render() {

        return (
            <div style={{width: 100, height: 100, backgroundColor: '#8d8d8d'}}>
                <div onClick={this.click2} style={{width: 50, height: 50, backgroundColor: '#646464'}}>heheheh</div>
            </div>
        );
    }
}

export default DemoMain;