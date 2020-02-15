import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: false,
            validation: ""
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const loginRequest = {
            'username': this.state.username,
            'password': this.state.password,
        }
        axios.post('http://localhost:8080/auth/authenticate', loginRequest)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ redirect: true })
                }
            }).catch((error) => {
                console.log(error.response);
            });
    }

    handleConfirmation = () => {
        if (this.state.validation === "") {
            const confirmationToken = this.props.location.pathname.split('/').slice(-1);
            console.log(confirmationToken);
            axios.patch(`http://localhost:8080/auth/confirm/${confirmationToken}`)
                .then((response) => {
                    console.log(response);
                    this.setState({ validation: 'success' });
                }).catch((error) => {
                    this.setState({ validation: 'error' });
                });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row row-padding">
                    {!this.props.location.pathname.startsWith('/confirm') ?
                        <div className="col-md-4 offset-md-4">
                            <h4>login</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label className="d-flex p-2" htmlFor="username">username</label>
                                    <input type="input" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} placeholder="username" />
                                </div>
                                <div className="form-group">
                                    <label className="d-flex p-2" htmlFor="password">password</label>
                                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="password" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <small id="register-redirect" className="form-text text-muted">Click here to <Link to='/auth/register'>register</Link></small>
                            </form>
                        </div> :
                        <div className="col-md-12">
                            {this.handleConfirmation()}
                            <div className="card">
                                <div className="card-body">
                                    <p className="lead">
                                        {(this.state.validation === 'success' ?
                                            <small>Your account has been activated. Click <Link to='/auth/login'>here</Link> to log in.</small> :
                                            <small>An error occured while trying to activate your account. Click <Link to='/auth/register'>here</Link> to register.</small>
                                        )}
                                        {this.state.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default LoginForm;