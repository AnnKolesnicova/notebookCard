import Form from './Form';
import Modal from './Modal';
import List from './List';

export default class Application {

    constructor () {
        this.list = new List;
        this.form = new Form(this.list);
        this.modal = new Modal;
    }

    run () {
        this.list.render();
    }

}


