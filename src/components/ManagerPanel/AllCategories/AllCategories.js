import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'semantic-ui-react';
import { connect } from 'react-redux'
import Notification from '../../../Utils/Notification';

import { GetCategories, UpdateCategory, RemoveCategory, removeCategorynotification } from '../../../Redux/CategorySlice';
import { Link } from 'react-router-dom';
import PageLoading from '../../common/PageLoading';

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

useEffect(() => {
    const { Categories, removeCategorynotification } = props
    Notification(Categories.notifications, removeCategorynotification)
})

    return (
        (props.Categories.isLoading) ? <PageLoading />
            : <Table fixed>
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
                            <Table.Cell><Link to={'/UpdateCategory/' + element.id}><Button basic color='blue'>  Edit</Button></Link></Table.Cell>
                            <Table.Cell><Button onClick={() => props.RemoveCategory(element.id)} basic color='red'> Remove</Button></Table.Cell>
                            {/* <Table.Cell><Button onClick={RemoveCategory(element.id)} basic color='red'> Remove</Button></Table.Cell>
                    <Table.Cell><Button onClick={UpdateCategory(element)} basic color='blue'>  Edit</Button></Table.Cell> */}


                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
    )
}

const mapStateToProps = (state) => ({
    Categories: state.Categories,
})

const mapDispatchToProps = {
    GetCategories,
    UpdateCategory,
    RemoveCategory, 
    removeCategorynotification
}


export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)