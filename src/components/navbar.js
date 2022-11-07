import React, { Component } from "react";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { NavLink } from "react-router-dom";
import reactOnclickoutside from "react-onclickoutside";

// : Secure File Sharing Platform

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navB: true,
        };
        this.handleNav = this.handleNav.bind(this);
    }
    handleClickOutside = () => {
        if (this.state.navB !== true) {
            this.setState({
                navB: !this.state.navB,
            });
        }
    }
    handleNav = () => {
        this.setState({
            navB: !this.state.navB,
        });
    }

    render() {
        const nav = this.state.navB;
        return (
            <div className="flex justify-between items-center text-white h-24 max-w-[1240px] mx-auto px-4">
                <h1 className='w-full text-3xl font-bold text-[#f3c007e2]'>SecureShare: A Secure File Sharing Platform</h1>
                <ul className="hidden md:flex">
                    <li className="p-4"><NavLink to="/">Home</NavLink></li>
                    <li className="p-4"><NavLink to="/About">About</NavLink></li>
                    <li className="p-4"><NavLink to="/Contact">Contact</NavLink></li>
                </ul>
                <div onClick={this.handleNav} className="block md:hidden">
                    {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>
                <div className={!nav ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-700" : "fixed left-[-100%] "} >
                    <h1 className='w-full text-3xl font-bold text-[#f3c007e2] p-4 '>SecureShare</h1>
                    <ul className="uppercase" onClick={this.handleNav} >
                        <NavLink to="/" >
                            <li className="p-4 border-b border-gray-600">Home</li>
                        </NavLink>
                        <NavLink to="/About">
                            <li className="p-4 border-b border-gray-600">About</li>
                        </NavLink>
                        <NavLink to="/Contact">
                            <li className="p-4">Contact</li>
                        </NavLink>
                    </ul>
                </div>
            </div>
        )
    }

}

export default reactOnclickoutside(Navbar);