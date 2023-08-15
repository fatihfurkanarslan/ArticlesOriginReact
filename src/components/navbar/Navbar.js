import React from 'react'
import './Navbar.css'
import { Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const trigger = (
        <span>
            <Icon name='user' size='large' />
        </span>
    )



    return (
        <div className='w-full flex flex-row justify-between items-center mt-2.5'>
            <div className='font-black text-[24px] font-serif tracking-[1px]'>ARTICLESORIGIN</div>
            <div className='flex flex-row items-center'>
                <div className='mr-[5px] navbar__searchbar'>
                    <input placeholder='Search'></input>
                </div>
                <div className='ml-[5px]'>
                    <Dropdown trigger={trigger} icon={null} >
                        <Dropdown.Menu>
                            <Dropdown.Item >
                                <div className='text-red-900'>
                                    Profile
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item text='Add Note' />
                            <Dropdown.Item text='My Notes' />
                            <Dropdown.Divider />
                            <Dropdown.Item text='Add Category' />        
                            <Dropdown.Item  >
                                <Link to="/AllCategories"><span className='text-black'>Categories</span></Link>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item text='Logout' />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}
