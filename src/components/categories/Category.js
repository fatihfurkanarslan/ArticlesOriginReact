// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Divider } from 'semantic-ui-react';

// export default function Category() {

//   const url = process.env.REACT_APP_BACKEND_URL;
//   const [categories, setcategories] = useState([])



//   useEffect(() => {
//     axios.get(url + "category/getcategories").then(Response => {
//       setcategories(Response.data)
//     }).catch(error => {
//       console.log('error: ', error);
//     });
//   }, [])

//   return (
//     <div>
//       <div className='w-full flex flex-row justify-center items-center mt-10'>
//         {categories.map((element, index) => {
//           return <p key={index}  className='mx-10 my-auto text-2xl font-serif font-light hover:text-gray-600 cursor-pointer'>{element.categoryname}</p>
//         })}
//       </div>
//       <Divider />
//     </div>
//   )
// }


import React, { Component } from 'react'
import axios from 'axios';
import { Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { GetCategories } from '../../Redux/CategorySlice';
import { connect } from 'react-redux';

class Category extends Component {

  constructor(props) {
    super(props);
    //this.state = { categories: [] }
  }


  componentDidMount() {
    /*  const url = process.env.REACT_APP_BACKEND_URL;
 
     axios.get(url + "category/getcategories").then(Response => {
       this.setState({
         categories: Response.data
       })
     }).catch(error => {
       console.log('error: ', error);
     }); */
    this.props.GetCategories()
  }

  
  render() {
    

    return (
      <div>
        <div className='w-full flex flex-row justify-center items-center mt-10'>
          {(this.props.Categories.list || []).map((element, index) => {
            return <Link key={index} to={`/Notes/${element.id}`} className="text-black">
              <p className='mx-10 my-auto text-2xl font-serif font-light hover:text-gray-600 cursor-pointer'>{element.categoryname}</p>
            </Link>
          })}
        </div>
        <Divider />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  //global redux state'indeki gerekli objeleri prop'a yükledik
  Categories:state.Categories
})

const mapDispatchToProps = {
  GetCategories
}


export default connect(mapStateToProps, mapDispatchToProps)(Category)
