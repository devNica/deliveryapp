import ProductExtra from '../../Extras/ProductExtras'
import './productextracontainer.css'

const ProductExtraContainer = ({extras}) => {

    const renderExtras = extras.map((item, i)=>(
        <>
            <ProductExtra item={item}/>
        </>
    ))

    return (
        <div className='pex-container'>
        <h2 className='pex-container-title'>Productos Extras</h2>
        {renderExtras}
        </div>
    )
}

export default ProductExtraContainer