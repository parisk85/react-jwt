import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            email: "",
            submitted: false
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const authRequest = {
            'username': this.state.username,
            'password': this.state.password,
            'passwordConfirm': this.state.passwordConfirm,
            'email': this.state.email
        }
        axios.post('http://localhost:8080/auth/register', authRequest)
            .then((response) => {
                if (response.status === 201) {
                    this.setState({ submitted: true });
                }
            }).catch((error) => {
                console.log(error.response);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row row-padding">
                    {(!this.state.submitted) ?
                        <div className="col-md-4 offset-md-4">
                            <h4>register</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label className="d-flex p-2" htmlFor="username">username</label>
                                    <input type="input" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} placeholder="username" />
                                </div>
                                <div className="form-group">
                                    <label className="d-flex p-2" htmlFor="password">password</label>
                                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="password" />
                                </div>
                                <div className="form-group">
                                    <label className="d-flex p-2" htmlFor="confirm-password">confirm password</label>
                                    <input type="password" className="form-control" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleChange} placeholder="password" />
                                </div>
                                <div className="form-group">
                                    <label className="d-flex p-2" htmlFor="email">e-mail</label>
                                    <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="e-mail" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <small id="login-redirect" className="form-text text-muted">Click here to <Link to='/auth/login'>login</Link></small>
                            </form>
                        </div> :
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <p className="lead"><small>
                                        You have successfully submitted your information. An email will be send to <mark>{this.state.email}</mark>. Please follow its instructions to complete your registration.
                                </small></p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default RegisterForm;