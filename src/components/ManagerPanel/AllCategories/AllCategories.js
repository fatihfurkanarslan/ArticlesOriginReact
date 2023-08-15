import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'semantic-ui-react';
import { connect } from 'react-redux'

import { GetCategories } from '../../../Redux/CategorySlice';

function AllCategories(props) {

    /* const [categoryState, setCategory] = useState([]); */
    /*  const apiUrl = process.env.REACT_APP_BACKEND_URL; */

    useEffect(() => {
        /* axios.get(apiUrl + "category/getcategories")
            .then((Response) => {
                setCategory(Response.data)
            }).catch((error) => {
                console.log(error);
            }) */

        props.GetCategories()
    }, []);


    const removeCategory = (id) => {

        /*  axios.get(apiUrl + "category/delete/" + id).then((Response) => {
 
         }
         ).catch((error) => {
             console.log(error);
         }
 
         ) */


    }


    return (
        <div>

            <Table fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {(props.Categories.list || []).map((element, index) => {
                        return <Table.Row key={Math.random()}>
                            <Table.Cell>{element.categoryname}</Table.Cell>
                            <Table.Cell>{element.description}</Table.Cell>
                            <Table.Cell><Button basic color='blue'>  Edit</Button></Table.Cell>
                            <Table.Cell><Button onClick={removeCategory(element.id)} basic color='red'> Remove</Button></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>

        </div>
    )
}

const mapStateToProps = (state) => ({
    Categories: state.Categories,
})

const mapDispatchToProps = {
    GetCategories
}


export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)