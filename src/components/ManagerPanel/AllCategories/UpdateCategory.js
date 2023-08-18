import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { Card, Icon, Image } from 'semantic-ui-react'


import { GetCategory, UpdateCategory } from '../../../Redux/CategorySlice';
import { useHistory } from 'react-router-dom';

function UpdateCagetory(props) {

    const [categoryState, setCategory] = useState({});
    const history = useHistory();
    const [isDatafetched, setisDatafetched] = useState(false);


    useEffect(() => {

        const id = props.match.params.id;
        props.GetCategory(id);
    }, []);

    useEffect(() => {

        const { Categories } = props
        const { selected_record, isLoading } = Categories
        if (selected_record && Object.keys(selected_record).length > 0 && selected_record.id !== 0 && !isLoading && !isDatafetched) {
            setCategory(selected_record);
            setisDatafetched(true);
        }
    })


    const handleSave = () => {
        try {
            
            const updatedCategory = {
                ...categoryState,        
            };

            props.UpdateCategory({data:updatedCategory, history});
    
        } catch (error) {
            console.log("error occured..");
        }
    };


    return (


        <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
                <div  className='flex items-center justify-center'>
                    <Form.Input onChange={(e) => { setCategory({ ...categoryState, categoryname: e.target.value }) }} value={categoryState.categoryname?categoryState.categoryname:''} />
                    
                </div>
                <br />
                <div  className='flex items-center justify-center'>
                    <Card.Description>
                        <Form.Input onChange={(e) => { setCategory({ ...categoryState, description: e.target.value }) }} value={categoryState.description?categoryState.description:''} />
                    </Card.Description>
                </div>
                <br />
                <div  className='flex items-center justify-center'>
                    <Card.Meta>
                        <span className='date'>Joined in 2015</span>
                    </Card.Meta>
                </div>

            </Card.Content>

            <button className="ui icon right labeled button" onClick={handleSave}>
                Save<i aria-hidden="true" className="right arrow icon"></i>
            </button>

        </Card>
    )
}

const mapStateToProps = (state) => ({
    Categories: state.Categories,
})

const mapDispatchToProps = {
    GetCategory,
    UpdateCategory,
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateCagetory)