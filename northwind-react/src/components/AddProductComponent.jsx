import React, { Component } from 'react';
import ProductService from '../services/product/ProductService';

class AddProductComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //step2
            id: this.props.match.params.id,
            name: '',
            spec: '',
            price: ''
        }
        //binding
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSpecHandler = this.changeSpecHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    //step3
    componentDidMount() {
        //stpe 4 checking id
        if (this.state.id === -1) { return; }
        else {
            ProductService.getProductByID(this.state.id).then((response) => {
                let product = response.data;
                this.setState({
                    name: product.name,
                    spec: product.spec,
                    price: product.price
                })
            });
        }
    }
    saveProduct = (event) => {
        event.preventDefault();
        
        let product = { name: this.state.name, spec: this.state.spec, price: this.state.price };
        //step 5 shecking for update or add
        if (this.state.id == -1) {
           
            ProductService.addProduct(product).then(res => {
                this.props.history.push('/product');
            });
        }
        else {
            let product = { id:this.state.id , name: this.state.name, spec: this.state.spec, price: this.state.price };
            ProductService.updateProduct(this.state.id, product).then((res) => {
                this.props.history.push('/product');
            });
        }
        // console.log('product update -> ' + JSON.stringify(product)); 
        // displaying in console
    }
    cancel() {
        this.props.history.push('/product')
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }
    changeSpecHandler = (event) => {
        this.setState({ spec: event.target.value });
    }
    changePriceHandler = (event) => {
        this.setState({ price: event.target.value });
    }

    getTitle() {
        if (this.state.id == -1) {
            return <h4>Add Product </h4>
        }
        return <h4>Update Product </h4>        
    }

    render() {
        return (
            <div className="my-3">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <div className="text-center mt-3">
                            {
                                this.getTitle()
                            }
                        </div>
                        <div className="card-body">
                            <form action="">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input placeholder="Name" name="name" className="form-control"
                                        value={this.state.name} onChange={this.changeNameHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Specification</label>
                                    <input placeholder="Specification" name="spec" className="form-control"
                                        value={this.state.spec} onChange={this.changeSpecHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input placeholder="Price" name="price" className="form-control"
                                        value={this.state.price} onChange={this.changePriceHandler} />
                                </div>
                                <button className="btn btn-success mr-3" onClick={this.saveProduct}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProductComponent;