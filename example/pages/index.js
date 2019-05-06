import { Provider }  from 'react-redux';
import { store } from './store';
import Subtree from './subtree';

const Index = () => (
    <Provider store={store}>
        <div>
            <p>Hello Next.js</p>
            <Subtree />
        </div>
    </Provider>
  )
  
  export default Index