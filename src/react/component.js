import { enqueueSetState } from './set-state-queue'; 

class Component {
    constructor( props = {} ) {
        this.isReactComponent = true;

        this.state = {};
        this.props = props;
    }

    setState( stateChange ) {
        // Object.assign( this.state, stateChange );
        // renderComponent( this );
        enqueueSetState(stateChange, this); // 异步setState的实现
    }
}

export default Component;