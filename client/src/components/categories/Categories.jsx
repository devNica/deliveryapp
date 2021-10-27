import './categories.css'
import { Link } from 'react-router-dom'

const Categories = ({ categories }) => {
    
    const categoriesRender = categories.map((category) => (
        <div className="category" key={category.id}>
          <Link className="category-link" to={`/category/${category.id}/products`}>
            <img src={category.url} className="img-category" alt="" />
            <span className="category-description">{category.description}</span>
          </Link>
        </div>
      ));
    
    return (
        <>{categoriesRender}</>
    )
}

export default Categories